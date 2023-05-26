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

  private apiUrl = 'be.auras.social';
  //private apiUrl = 'localhost:8000';

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
/**
 * This function gets info of the user you send it the id
 * @param user_id the iD of the user you want to get
 * @returns Model User with the user info
 */
getUserOwner(user_id: any): Observable<User>{
  return this.http.post<User>('http://' + this.apiUrl + '/api/show', user_id);
}
/**
 * This function gets info of the user you send it the id
 * @returns Model User with the user info for the admin
 */
getUsersForAdmin(): Observable<User[]>{
  return this.http.get<User[]>('http://' + this.apiUrl + '/api/viewUsers');
}
/**
 * This function deletes the user you send the id
 * @param id from the user you want to delete
 * @returns 
 */
deleteUser(id: any){
  return this.http.post('http://' + this.apiUrl + '/api/deleteUser', id);
}
// Get the id user
getId(id:number){
 return this.myId= id;
}

}
