import { Directive, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../core/user-service/user-service.service';

@Directive({
  selector: '[appUserNameValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: UserNameValidatorDirective,
    multi: true
  }]
})
export class UserNameValidatorDirective implements Validators, OnInit {

  constructor(
    private userService: UserService
  ) { }

  private userData: Array<{name: string, email: string, password: string}> = [];

  ngOnInit(): void {
    this.userData = this.userService.getUserData();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const userName = control.value;
    if (userName != null) {
      if (userName.length > 0 && userName.length < 4) {
        return { uname_length_invalid: true };
      }
      const userExist = this.userData.find(user => user.name.toLowerCase() === userName.toLowerCase());
      if (userExist != null) {
        return { uname_already_exists: true };
      }
    } else {
      return null;
    }
  }

}
