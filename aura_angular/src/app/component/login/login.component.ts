import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private userService: UserService, 
              private authService: AuthServiceService, 
              private router: Router){}

  // Variable for is logged or not
  loggedUser!: boolean;
  error_message: string = '';

  // LOGIN FORM
  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  ngOnInit(): void {}

  submit() {}

  /**
   * Function to validate the user can login or not
   */
  checkUser(){

    this.userService.checkLogin(this.formLogin.value).subscribe((response) => {
      if(response != null){

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('actualUser', JSON.stringify(response));
        this.authService.actualUser = response;
        this.router.navigateByUrl('/');
      }else{
        this.error_message = 'Email or password incorrect!';
      }
    }, (error) => {});
  };
}
