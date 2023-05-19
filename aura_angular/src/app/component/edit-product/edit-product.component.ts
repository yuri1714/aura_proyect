import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  // fileToUpload: File = null;

  constructor(
    private http: HttpClient,
    private categories: CategoriesService,
    private productService: ProductService,
    private router: Router,
    private Aroute: ActivatedRoute,
  ) {}

  ngOnInit(): void {

    this.product_id = this.Aroute.snapshot.paramMap.get('id');

    this.categories.getCategories().subscribe((data: any) => {
      this.allCategories = data;
    });

    this.productService.getProducts().subscribe((data: Product[]) => {
      this.allProducts = data;
      for (let index = 0; index < this.allProducts.length; index++) {
        if (this.allProducts[index].id == this.product_id) {
          this.product_selected = this.allProducts[index];
          break;
        }
      }

      this.editProduct = new FormGroup({
        title: new FormControl(this.product_selected.title, [Validators.required, Validators.maxLength(50)]),
        img: new FormControl(''),
        price: new FormControl(this.product_selected.price, [Validators.required]),
        description: new FormControl(this.product_selected.description, [Validators.required]),
        category: new FormControl(this.product_selected.category, [Validators.required]),
      });
      
    });

  }
  

  // uploadFile(event: Event){
  //   const file = (event.target as HTMLInputElement)?.files?.[0];
  //   this.formProduct.patchValue({})
  // }
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files != null) {
      this.selectedFile = fileInput.files[0];
      console.log(this.selectedFile);

      if(this.selectedFile){
        if(!(this.selectedFile.type == 'image/jpg' || this.selectedFile.type == 'image/jpeg' || this.selectedFile.type == 'image/png')){
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
          this.editProduct.controls['img'].setErrors({'incorrect': true});
        } else if(!(this.validateImgExt && this.validateImgSize)){
          this.editProduct.controls['img'].setErrors(null);
        }
    }
    } else {
      // Error message if it is not file selected
      console.error('You need to select a product image.');
    }
  }

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
        next: (data) => {
          console.log(data);
          console.log('Product added!');
        },
        error: (err) => {
          console.log('error: ', err);
        },
      });
      this.router.navigate(['/ownprofile']);

  }


}
