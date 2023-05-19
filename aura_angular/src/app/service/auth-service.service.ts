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
  // Verifica si el usuario ha iniciado sesión
  isLoggedIn(check: boolean): boolean {
    // Aquí podrías agregar la lógica necesaria para verificar si el usuario ha iniciado sesión
    
    if(check){
      this.checkIsLogged = true;
    }else{
      this.checkIsLogged = false;
    }
    

    return this.checkIsLogged;
    // En este ejemplo, simplemente se devuelve true si la variable `isLoggedIn` es verdadera
  }

  // Inicia sesión con las credenciales proporcionadas
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