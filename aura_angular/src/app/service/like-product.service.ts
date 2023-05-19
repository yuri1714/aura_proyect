import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikeProductService {

  private apiUrl = 'http://localhost:8000/api/likeProduct';
  //private apiUrl = 'http://aurabe.battlecats02.games/api/likeProduct';

  constructor(private http: HttpClient) { }

  getLikeProducts(){
    return this.http.get(this.apiUrl);
  }

  searchLikeProduct(info: any){
    return this.http.post('http://localhost:8000/api/searchLike', info);
  }

  addLikeProduct(likeProduct: any) {
    return this.http.post(this.apiUrl, likeProduct);
  }

  deleteLikeProduct(id_like_product: any){
    return this.http.post('http://localhost:8000/api/deleteLikeProduct', id_like_product);
  }
}
