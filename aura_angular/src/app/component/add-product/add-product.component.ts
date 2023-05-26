import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { CategoriesService } from 'src/app/service/categories.service';
import { ProductService } from 'src/app/service/product.service';
import { ThisReceiver } from '@angular/compiler';
import { UserService } from 'src/app/service/user.service';
import * as L from 'leaflet';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  //IMG
  selectedFile!: File;
  imageUrl!: string;
  validateImgExt: boolean = false;
  validateImgSize: boolean = false;
  //IMG

  //MARKER
  marker!: L.Marker;
  //MARKER

  public preview!: string;
  public files: any = [];
  public loading!: boolean;
  public allCategories: any;

  constructor(
    private http: HttpClient,
    private categories: CategoriesService,
    private addproduct: ProductService,
    private router: Router
  ) { }

  formProduct = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    img: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    category: new FormControl('', [Validators.required]),
    paypalId: new FormControl('', []),
    lat: new FormControl(),
    lng: new FormControl(),

  });

  ngOnInit(): void {

    // create the map
    const map = L.map('map').setView([41.36293574789545, 2.114803791046143], 13);

    // adds a basemap layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // adds a control to select locations
    this.marker = L.marker([41.36293574789545, 2.114803791046143], {
      draggable: true,
    }).addTo(map);

    // handles the 'dragend' event of the marker to obtain the coordinates of the marker
    this.marker.on('dragend', (e: L.LeafletEvent) => {
      const latlng = e.target.getLatLng();
      const lat = latlng.lat;
      const lng = latlng.lng;
    });

    // It takes all the categories and places them in the variable.
    this.categories.getCategories().subscribe((data: any) => {
      this.allCategories = data;
    });
  }

  /**
   * Function for image selection in form aff-product
   * @param event
   */
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files != null) {
      this.selectedFile = fileInput.files[0];
      if(this.selectedFile){
        if (!(this.selectedFile.type == 'image/jpg' || this.selectedFile.type == 'image/jpeg' || this.selectedFile.type == 'image/png')) {
          this.validateImgExt = true;
        } else {
          this.validateImgExt = false;
        }

        if(this.selectedFile.size > 10000000){
          this.validateImgSize = true;
        } else {
          this.validateImgSize = false;
        }

        if(this.validateImgExt || this.validateImgSize){
          this.formProduct.controls['img'].setErrors({'incorrect': true});
        } else if(!(this.validateImgExt && this.validateImgSize)){
          this.formProduct.controls['img'].setErrors(null);
        }
      }
    } else {

      // Error message if it is not file selected
      console.error('You need to select a product image.');
    }
  }

  /**
   * Function to add the product to the database
   */
  addProduct() {

    // Variable to get the user id
    const id_user = JSON.parse(localStorage.getItem('actualUser')!);

    // Variable for stacking and uploading all fields to database
    const formData = new FormData();

    // Adds the filled fields to the FormData variable
    // ------------------------------------------------------------------
    formData.append('title', this.formProduct.value.title!);
    formData.append('img', this.selectedFile);
    formData.append('price', this.formProduct.value.price!);
    formData.append('description', this.formProduct.value.description!);
    formData.append('category', this.formProduct.value.category!);
    formData.append('user_id', id_user.id);
    formData.append('user_paypal_id', this.formProduct.value.paypalId!);
    formData.append('lat', this.marker.getLatLng().lat.toString());
    formData.append('lng', this.marker.getLatLng().lng.toString());
    // ------------------------------------------------------------------
      this.addproduct.addProduct(formData).subscribe({
      });
      this.router.navigate(['/']);
  }
}
