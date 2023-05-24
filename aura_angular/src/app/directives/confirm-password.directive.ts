import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]',
  providers: [
    {
    provide: NG_VALIDATORS,
    useExisting: ConfirmPasswordDirective,
    multi: true
    }
  ]
})
export class ConfirmPasswordDirective {

  @Input() param!:any;

  constructor() { }

  /**
   * The function validates if confirm password its similar to password
   * @param control 
   * @returns if control it different from param return true. Else return null
   */
  validate(control: AbstractControl): ValidationErrors | null {  
    if (control && control.value && control.value != this.param) {
      return {'noMatch': true}
    }else{
      return null;
    }

  }
}
