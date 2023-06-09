import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,

} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CategoriesService } from 'src/app/service/categories.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/Models/products/products.module';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  //IMG
  selectedFile!: File;
  imageUrl!: string;
  validateImgExt: boolean = false;
  validateImgSize: boolean = false;
  product_id!: any;
  allProducts: Product[] = [];
  product_selected!: Product;
  editProduct!: FormGroup;
  //IMG

  public preview!: string;
  public files: any = [];
  public loading!: boolean;
  public allCategories: any;


  constructor(
    private categories: CategoriesService,
    private productService: ProductService,
    private router: Router,
    private Aroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    // Used to get the route id
    this.product_id = this.Aroute.snapshot.paramMap.get('id');

    // Take all categoryes from DB
    this.categories.getCategories().subscribe((data: any) => {
      this.allCategories = data;
    });

    // Entering the product service
    this.productService.getProducts().subscribe((data: Product[]) => {

      // assigns the corresponding product to the variable this.product_selected.
      this.allProducts = data;
      for (let index = 0; index < this.allProducts.length; index++) {
        if (this.allProducts[index].id == this.product_id) {
          this.product_selected = this.allProducts[index];
          break;
        }
      }

      // creates a form called editProduct containing fields for editing the attributes of a selected product
      this.editProduct = new FormGroup({
        title: new FormControl(this.product_selected.title, [Validators.required, Validators.maxLength(50)]),
        img: new FormControl(''),
        price: new FormControl(this.product_selected.price, [Validators.required]),
        description: new FormControl(this.product_selected.description, [Validators.required]),
        category: new FormControl(this.product_selected.category, [Validators.required]),
      });
    });
  }

  /**
   * Fuction for chage the image a edit product
   * @param event
   */
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files != null) {
      this.selectedFile = fileInput.files[0];

      //Image validations
      if (this.selectedFile) {
        if (!(this.selectedFile.type == 'image/jpg' || this.selectedFile.type == 'image/jpeg' || this.selectedFile.type == 'image/png')) {
          this.validateImgExt = true;
        } else {
          this.validateImgExt = false;
        }

        if (this.selectedFile.size > 2000000) {
          this.validateImgSize = true;
        } else {
          this.validateImgSize = false;
        }

        if (this.validateImgExt || this.validateImgSize) {
          this.editProduct.controls['img'].setErrors({ 'incorrect': true });
        } else if (!(this.validateImgExt && this.validateImgSize)) {
          this.editProduct.controls['img'].setErrors(null);
        }
      }
    } else {

      // Error message if it is not file selected
      console.error('You need to select a product image.');
    }
  }

  /**
   * This function is for update the product
   */
  updateProduct() {
    const id_user = JSON.parse(localStorage.getItem('actualUser')!);
    const formData = new FormData();
    const price = this.editProduct.value.price?.toString();
    formData.append('id', this.product_id!);
    formData.append('title', this.editProduct.value.title!);
    formData.append('img', this.selectedFile);
    formData.append('price', price!);
    formData.append('description', this.editProduct.value.description!);
    formData.append('category', this.editProduct.value.category!);
    formData.append('user_id', id_user.id);

    this.productService.editProduct(formData).subscribe({
    });
    this.router.navigate(['/ownprofile']);
  }
}
