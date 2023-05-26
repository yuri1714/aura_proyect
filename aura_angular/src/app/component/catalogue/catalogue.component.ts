import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { FormControl,FormGroup,} from '@angular/forms';
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
  noProducts!: boolean;

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
    this.products.getProducts().subscribe((data: Product[]) => {
      this.allProducts = data;
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
  }
}

