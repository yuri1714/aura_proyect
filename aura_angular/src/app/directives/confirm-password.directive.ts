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

  validate(control: AbstractControl): ValidationErrors | null {  
    if (control && control.value && control.value != this.param) {
      return {'noMatch': true}
    }else{
      return null;
    }

  }
}
