import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikeUserService {

  //private apiUrl = 'http://localhost:8000/api/likeUser';
  private apiUrl = 'http://be.auras.social/api/likeUser';

  constructor(private http: HttpClient) { }

  getLikeUsers(){
    return this.http.get(this.apiUrl);
  }

  searchLikeUser(info: any){
    return this.http.post('http://be.auras.social/api/searchLikeUser', info);
  }

  addLikeUser(likeUser: any) {
    return this.http.post(this.apiUrl, likeUser);
  }

  deleteLikeUser(id: any){
    return this.http.post('http://be.auras.social/api/deleteLikeUser', id);
  }
}
