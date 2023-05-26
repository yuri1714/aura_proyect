import { Component } from '@angular/core';
import { AuthServiceService } from './service/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aura-project';
  constructor(private authService: AuthServiceService){}
  isLogged!:boolean;
  id_user_logged: any;
  user_icon_url!: string;
  user_info: any;

  /**
   * Checks if the user is logged or not
   * @returns boolean
   */
  checkLogin(): boolean{
    
    if(localStorage.getItem('isLoggedIn') == 'true'){
      this.isLogged = false;
      this.id_user_logged = JSON.parse(localStorage.getItem('actualUser')!);
    }else{
      this.isLogged = true;
    }
    return this.isLogged;
  }

  /**
   * Sends true if the user logged is not admin and false if it is.
   * Also sets the url of the icon of each user.
   * @returns boolean 
   */
  checkRole(): boolean{
    const userLogged = JSON.parse(localStorage.getItem('actualUser')!);
    if(userLogged){
      this.user_icon_url = userLogged.icon;
      this.user_info = userLogged;
      if(localStorage.getItem('isLoggedIn') == 'true' && userLogged.role == 'admin'){
        return false;
      }else{
        return true;
      }
    } else {
      return true;
    }
    
    
  }


  /**
   * Sets the icon url in '', puts the localStorage variable "isLoggedIn" in false
   * and removes the user of the localStorage.
   */
  logout(): void{
    this.user_icon_url = '';
    localStorage.setItem('isLoggedIn','false'); 
    localStorage.removeItem('actualUser');
  }
}
