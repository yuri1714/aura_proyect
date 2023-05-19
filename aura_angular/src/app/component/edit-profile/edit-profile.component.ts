import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from '../../Models/user/user.module';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{

  editForm!: FormGroup;
  selectedFile!: File;
  validateImgExt: boolean = false;
  validateImgSize: boolean = false;
  actual_user!: any;
  pswdDisabled: boolean = true;

  constructor(public userService: UserService,
              private router: Router){}

  ngOnInit(): void {
    this.actual_user = JSON.parse(localStorage.getItem('actualUser') || '[]');

    this.editForm = new FormGroup({
      name: new FormControl(this.actual_user.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i),
      ]),
      lastname: new FormControl(this.actual_user.lastname, [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i),
      ]),
      password: new FormControl(this.actual_user.password, [
        Validators.required,
        Validators.minLength(8)
      ]),
      img: new FormControl('', []),
    });

    
  }

  submit(){
    const formData = new FormData();
    formData.append('id', this.actual_user.id);
    formData.append('name', this.editForm.value.name!);
    formData.append('lastname', this.editForm.value.lastname!);
    formData.append('password', this.editForm.value.password!);
    formData.append('img', this.selectedFile!);

    this.userService.updateUser(formData).subscribe((response) => {
      console.log(response);
      const user_updated = JSON.parse(localStorage.getItem('actualUser') || '[]');
      user_updated.name = this.editForm.value.name;
      user_updated.lastname = this.editForm.value.lastname;
      user_updated.password = this.editForm.value.password;
      localStorage.setItem('actualUser', JSON.stringify(user_updated));
      this.router.navigate(['/ownprofile']);
    }, (error) => {
      console.log(error);
    });

  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files != null) {
      this.selectedFile = fileInput.files[0];
      console.log(this.selectedFile);

      if(this.selectedFile){
        if(!(this.selectedFile.type == 'image/jpg' || this.selectedFile.type == 'image/jpeg' || this.selectedFile.type == 'image/png')){
          this.validateImgExt = true;
          this.editForm.setErrors({ 'invalid': true });
        } else {
          this.validateImgExt = false;
          this.editForm.setErrors({ 'invalid': null });
          this.editForm.updateValueAndValidity();
        }

        if(this.selectedFile.size > 2000000){
          this.validateImgSize = true;
        } else {
          this.validateImgSize = false;
        }

        if(this.validateImgExt || this.validateImgSize){
          this.editForm.controls['img'].setErrors({'incorrect': true});
        } else if(!(this.validateImgExt && this.validateImgSize)){
          this.editForm.controls['img'].setErrors(null);
        }
    }
    } else {
      // Error message if it is not file selected
      console.error('You need to select a product image.');
    }
  }

}
