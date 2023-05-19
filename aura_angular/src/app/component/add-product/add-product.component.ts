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
  // public google: any;

  // fileToUpload: File = null;

  constructor(
    private http: HttpClient,
    private categories: CategoriesService,
    private addproduct: ProductService,
    private router: Router
  ) { }

  formProduct = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    img: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    paypalId: new FormControl('', []),
    lat: new FormControl(),
    lng: new FormControl(),

  });

  ngOnInit(): void {
    // crea el mapa
    const map = L.map('map').setView([41.36293574789545, 2.114803791046143], 13);

    // agrega una capa de mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // agrega un control para seleccionar ubicaciones
    this.marker = L.marker([41.36293574789545, 2.114803791046143], {
      draggable: true,
    }).addTo(map);

    // maneja el evento 'dragend' del marcador para obtener las coordenadas
    this.marker.on('dragend', (e: L.LeafletEvent) => {
      const latlng = e.target.getLatLng();
      const lat = latlng.lat;
      const lng = latlng.lng;

      console.log(`Latitud: ${lat}, Longitud: ${lng}`);
    });

    this.categories.getCategories().subscribe((data: any) => {
      this.allCategories = data;
    });


  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files != null) {
      this.selectedFile = fileInput.files[0];
      console.log(this.selectedFile);
      if(this.selectedFile){
        if (!(this.selectedFile.type == 'image/jpg' || this.selectedFile.type == 'image/jpeg' || this.selectedFile.type == 'image/png')) {
          this.validateImgExt = true;
        } else {
          this.validateImgExt = false;
        }

        if(this.selectedFile.size > 2000000){
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

  addProduct() {
    const id_user = JSON.parse(localStorage.getItem('actualUser')!);
    const formData = new FormData();
    formData.append('title', this.formProduct.value.title!);
    formData.append('img', this.selectedFile);
    formData.append('price', this.formProduct.value.price!);
    formData.append('description', this.formProduct.value.description!);
    formData.append('category', this.formProduct.value.category!);
    formData.append('user_id', id_user.id);
    formData.append('user_paypal_id', this.formProduct.value.paypalId!);
    formData.append('lat', this.marker.getLatLng().lat.toString());
    formData.append('lng', this.marker.getLatLng().lng.toString());

      this.addproduct.addProduct(formData).subscribe({
        next: (data) => {
          console.log(data);
          console.log('Product added!');
        },
        error: (err) => {
          console.log('error: ', err);
        },
      });
      this.router.navigate(['/']);

  }


}
