import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = 'http://localhost:8000/api/category';
  //private apiUrl = 'http://aurabe.battlecats02.games/api/category';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(this.apiUrl);
  }
}
