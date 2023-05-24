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
   * function to call the database information from the likeProducts
   * @returns all database information 
   */
  getLikeProducts(){
    return this.http.get(this.apiUrl);
  }

  /**
   * Function to search the like products of the user
   * @param info user_id of the user clicks on a product and the id_product of the product the user clicked on.
   * @returns  
   */
  searchLikeProduct(info: any){
    return this.http.post('http://be.auras.social/api/searchLike', info);
  }

  /**
   * Function from add news likeProducts
   * @param ID 
   * @returns 
   */
  addLikeProduct(likeProduct: any) {
    return this.http.post(this.apiUrl, likeProduct);
  }

  /**
   * Function for detele a one like product
   * @param id_like_product 
   * @returns the product like eliminator of the user's favorites part
   */
  deleteLikeProduct(id_like_product: any){
    return this.http.post('http://be.auras.social/api/deleteLikeProduct', id_like_product);
  }
}
