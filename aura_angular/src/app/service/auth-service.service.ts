import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }
  checkIsLogged!: boolean;
  actualUser: any;
  /**
   * Checks if the user is logged in
   *  @param check
   */ 
  isLoggedIn(check: boolean): boolean {

    // Here you could add the necessary logic to check if the user is logged in.
    if(check){
      this.checkIsLogged = true;
    }else{
      this.checkIsLogged = false;
    }
    

    return this.checkIsLogged;
  }

  /**
   * Log in with the provided credentials
   * @param username
   * @param password
   * @param checkName
   * @param checkPassword
   */
  login(username: string, password: string, checkName: string, checkPassword: string): boolean {

    const isValid = username === checkName && password === checkPassword;
    return isValid;
  }

  /**
   * Logs out the current user
   */
  logout(): void {

    this.isLoggedIn(false);
  }
}