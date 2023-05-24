import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myform!:FormGroup;
  selectedFile!: File;
  imageUrl!: string;
  validateImgExt: boolean = false;
  validateImgSize: boolean = false;

  constructor(public userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.validateImgExt = false;
    this.validateImgSize = false;

    this.myform = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      birthdate: new FormControl('', [
        Validators.required,
        this.ageValidator,
        this.birthdateFutureValidator
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      rpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      img: new FormControl('', [
        Validators.required,
      ]),
      terms: new FormControl(false,[
        Validators.requiredTrue
      ])
    })

  }

  /**
   * function for validate the age from a user
   * @param control
   * @returns true if the age its less than 18
   */
  ageValidator(control: any) {
    const birthdate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    if (age < 18) {
      return { 'underAge': true };
    }
    return null;
  }

  birthdateFutureValidator(control: any) {
    const birthdate = new Date(control.value);
    const today = new Date();
    if (birthdate > today) {
      return { 'futureDate': true };
    }
    return null;
  }
  //OnClick do this function:
  submit() {

    const formData = new FormData();
    formData.append('name', this.myform.value.name!);
    formData.append('lastname', this.myform.value.lastname!);
    formData.append('email', this.myform.value.email!);
    formData.append('password', this.myform.value.password!);
    formData.append('birthdate', this.myform.value.birthdate!);
    formData.append('img', this.selectedFile!);

    this.userService.addUser(formData).subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl('/login');
    }, (error) => {
      console.log(error);
    });
  }

  /**
   * Function to save and validate a icon of user
   * @param event its a image select of form html
   */
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files != null) {
      this.selectedFile = fileInput.files[0];
      console.log(this.selectedFile);
      if(this.selectedFile){
        if(!(this.selectedFile.type == 'image/jpg' || this.selectedFile.type == 'image/jpeg' || this.selectedFile.type == 'image/png')){
          this.validateImgExt = true;
        } else {
          this.validateImgExt = false;
        }

        if(this.selectedFile.size > 2000000){
          this.validateImgSize = true;
        } else {
          this.validateImgSize = false;
        }

        if(this.validateImgExt || this.validateImgSize){
          this.myform.controls['img'].setErrors({'incorrect': true});
        } else if(!(this.validateImgExt && this.validateImgSize)){
          this.myform.controls['img'].setErrors(null);
        }
      }

    } else {
      // Error message if it is not file selected
      console.error('You need to select a product image.');
    }
  }


}
