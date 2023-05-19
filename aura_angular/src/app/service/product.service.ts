import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Models/products/products.module';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8000/api/product';
  //private apiUrl = 'http://aurabe.battlecats02.games/api/product';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: any) {
    console.log(product);
    return this.http.post(this.apiUrl, product);
  }

  editProduct(product: any) {
    return this.http.post('http://localhost:8000/api/editProduct', product);
  }

  deleteProduct(id: any) {
    return this.http.post('http://localhost:8000/api/deleteProduct', id);
  }

}
