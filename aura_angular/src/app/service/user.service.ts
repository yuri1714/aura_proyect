import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  myId!: number;

  constructor(private http: HttpClient) { }

  //private apiUrl = 'aurabe.battlecats02.games';
  private apiUrl = 'localhost:8000';

// Check if login is correct
checkLogin(user: any){
  return this.http.post('http://' + this.apiUrl + '/api/user', user);
}

// Add new user to DDBB
addUser(user: any) {
  return this.http.post('http://' + this.apiUrl + '/api/register', user);
}

// Update user
updateUser(user: any) {
  return this.http.post('http://' + this.apiUrl + '/api/editUser', user);
}

getUserOwner(user_id: any): Observable<User>{
  return this.http.post<User>('http://' + this.apiUrl + '/api/show', user_id);
}

getUsersForAdmin(): Observable<User[]>{
  return this.http.get<User[]>('http://' + this.apiUrl + '/api/viewUsers');
}

deleteUser(id: any){
  return this.http.post('http://' + this.apiUrl + '/api/deleteUser', id);
}

getId(id:number){
 return this.myId= id;
}

}
