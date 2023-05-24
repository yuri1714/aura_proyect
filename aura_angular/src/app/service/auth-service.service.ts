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
   * @param check is a value that validates whether or not the user is logged in.
   * @returns 
   */
  isLoggedIn(check: boolean): boolean {
    
    if(check){
      this.checkIsLogged = true;
    }else{
      this.checkIsLogged = false;
    }
    

    return this.checkIsLogged;
  }

  /**
   * It is a function that validates if the user logging in is similar to a user in the database
   * @param username name of user
   * @param password  Pass of user
   * @param checkName value of connfirm if username its similar
   * @param checkPassword value of confim if password its similar 
   * @returns is valid 
   */
  login(username: string, password: string, checkName: string, checkPassword: string): boolean {
    // Aquí podrías agregar la lógica necesaria para iniciar sesión con las credenciales proporcionadas
    // En este ejemplo, simplemente se devuelve true si las credenciales son correctas
    const isValid = username === checkName && password === checkPassword;
    return isValid;
  }

  // Cierra la sesión del usuario actual
  logout(): void {
    // Aquí podrías agregar la lógica necesaria para cerrar la sesión del usuario actual
    // En este ejemplo, simplemente se establece la variable `isLoggedIn` en falso

    this.isLoggedIn(false);
  }

}