import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  //private apiUrl = 'http://localhost:8000/api/category';
  private apiUrl = 'http://be.auras.social/api/category';

  constructor(private http: HttpClient) { }

  /**
   * function from call to categori database
   * @returns all categories in the database
   */
  getCategories() {
    return this.http.get(this.apiUrl);
  }
}
