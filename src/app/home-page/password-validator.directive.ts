import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordValidatorDirective,
    multi: true
  }]
})
export class PasswordValidatorDirective {

  constructor() { }

  /*
  Credits:
  https://www.truecodex.com/course/angular-6/create-a-custom-validators-for-template-driven-forms-and-reactive-forms-in-angular-7
  */

  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (password != null && !password.match(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/)) {
      // must be between 8 - 16 letters and contains special char
      return { pwd_valid: true };
    } else {
      return null;
    }
  }

}
