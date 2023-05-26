import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikeProductService {

  //private apiUrl = 'http://localhost:8000/api/likeProduct';
  private apiUrl = 'http://be.auras.social/api/likeProduct';

  constructor(private http: HttpClient) { }

  /**
   * Function that displays the products that the user has liked from the LikeProducts table.
   */
  getLikeProducts(){
    return this.http.get(this.apiUrl);
  }

  /**
   * Function that searches the parameter info for the product that the user has clicked as a favourite.
   * @param info
   */
  searchLikeProduct(info: any){
    return this.http.post('http://be.auras.social/api/searchLike', info);
  }

  /**
   * Function that adds a new Favourite product based on the parameter you pass to it.
   * @param likeProduct
   */
  addLikeProduct(likeProduct: any) {
    return this.http.post(this.apiUrl, likeProduct);
  }

  /**
   * function, which eliminates the favourite products thanks to the parameter called 
   * @param id_like_product
   */
  deleteLikeProduct(id_like_product: any){
    return this.http.post('http://be.auras.social/api/deleteLikeProduct', id_like_product);
  }
}
