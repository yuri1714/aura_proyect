import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryFilterPipe } from 'src/app/pipes/category-filter.pipe';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from 'src/app/service/categories.service';
import { Product } from 'src/app/Models/products/products.module';

@Component({
  selector: 'app-product',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent implements OnInit {
  allProducts: Product[] = [];
  searchTerm: string = '';
  priceRange = [0, 5000]; // Inicialize with a default range of price
  allCategories: any;
  page: number = 1; // current page

  constructor(
    private products: ProductService,
    private categories: CategoriesService
  ) {
    this.priceRange = [0, 5000]; // Inicialize with a default range of price
  }

  formCategory = new FormGroup({
    category: new FormControl('', []),
  });

  ngOnInit(): void {
    // Take all the products from db
    this.products.getProducts().subscribe((data: any) => {
      this.allProducts = data;
      console.log(this.allProducts);
    });

    // Take all the categories from db
    this.categories.getCategories().subscribe((data: any) => {
      this.allCategories = data;
    });
  }

  /**
   * Function to update the pricerange variable when you move the PriceRange
   * @param priceRange
   */
  onPriceRangeChange(priceRange: number[]) {
    this.priceRange = priceRange;
    console.log(priceRange);
  }
}
