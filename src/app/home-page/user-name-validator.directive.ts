import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appUserNameValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: UserNameValidatorDirective,
    multi: true
  }]
})
export class UserNameValidatorDirective implements Validators {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const userName = control.value;
    if (userName != null && userName.length < 4) {
      return { uname_valid: true };
    } else {
      return null;
    }
  }

}
