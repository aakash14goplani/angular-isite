import { Directive, OnInit, Input } from '@angular/core';
import { NG_VALIDATORS, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../core/user-service/user-service.service';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailValidatorDirective,
    multi: true
  }]
})
export class EmailValidatorDirective implements Validators, OnInit {

  constructor(
    private userService: UserService
  ) { }

  // tslint:disable: no-inferrable-types
  private userData: Array<{name: string, email: string, password: string}> = [];
  @Input('appEmailValidator') options: boolean = true;

  ngOnInit(): void {
    this.userData = this.userService.getUserData();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const userEmail = control.value;
    if (this.options && userEmail != null) {
      const userEmailExist = this.userData.find(user => user.email.toLowerCase() === userEmail.toLowerCase());
      if (userEmailExist != null) {
        return { uemail_already_exists: true };
      }
    } else {
      return null;
    }
  }

}

