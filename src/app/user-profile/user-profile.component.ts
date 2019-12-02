import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ProfileService } from './profile.service';
import { AuthService } from '../authentication/auth.service';
import { User } from '../authentication/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [ ProfileService ]
})
export class UserProfileComponent implements OnInit, OnDestroy {

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) { }

  private userName: string = '';
  private userEmail: string = '';
  private updateMessageForName: boolean = false;
  private nameMessage: string = 'Update User Name';
  private updateMessageForEmail: boolean = false;
  private emailMessage: string = 'Update User Email';
  private authServiceSubscription: Subscription;

  private userNameErrorMessage: string = '';
  private userEmailErrorMessage: string = '';
  private userPasswordErrorMessage: string = '';

  @ViewChild('userNameInput', {static: false}) newUserName: ElementRef;
  @ViewChild('userEmailInput', {static: false}) newUserEmail: ElementRef;
  @ViewChild('currentPassword', {static: false}) currentPassword: ElementRef;
  @ViewChild('newPassword', {static: false}) newPassword: ElementRef;
  @ViewChild('confirmNewPassword', {static: false}) confirmNewPassword: ElementRef;

  ngOnInit(): void {
    this.authServiceSubscription = this.authService.user.subscribe((userData: User) => {
      if (userData) {
        this.userName = userData.name;
        this.userEmail = userData.email;
      }
    });
  }

  private updateDisplayMessageFor(type: string): void {
    if (type === 'name') {
      this.updateMessageForName = !this.updateMessageForName;
      this.nameMessage = (this.updateMessageForName) ? 'Cancel' : 'Update User Name';
    }
    if (type === 'email') {
      this.updateMessageForEmail = !this.updateMessageForEmail;
      this.emailMessage = (this.updateMessageForEmail) ? 'Cancel' : 'Update User Email';
    }
  }

  private updateUserValueFor(type: string) {
    if (type === 'name') {
      this.userNameErrorMessage = '';
      const newUserName = this.newUserName.nativeElement.value;

      if (newUserName) {
        if (newUserName.length > 0 && newUserName.length < 4) {
          this.userNameErrorMessage = 'USER NAME SHOULD BE GREATER THAN 4 CHARACTERS';
        }
        const userExist = this.profileService.getUserData().find(user => user.name.toLowerCase() === newUserName.toLowerCase());
        if (userExist != null) {
          this.userNameErrorMessage = 'USER ALREADY EXISTS';
        }
        console.log('updating name: ', newUserName, ', error: ', this.userNameErrorMessage);

        if (this.userNameErrorMessage.length === 0) {
          this.profileService.updateUserName(newUserName, this.userEmail);
        }
      }
    }
    if (type === 'email') {
      const newUserEmail = this.newUserEmail.nativeElement.value;
      this.userEmailErrorMessage = '';

      if (newUserEmail) {
        const userEmailExist = this.profileService.getUserData().find(user => user.email.toLowerCase() === newUserEmail.toLowerCase());
        if (userEmailExist != null) {
          this.userEmailErrorMessage = 'EMAIL ALREADY EXISTS';
        }
        const regexp: RegExp =
        new RegExp(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/);
        if (!regexp.test(newUserEmail)) {
          this.userEmailErrorMessage = 'INVALID EMAIL';
        }
        console.log('updating email: ', newUserEmail, ', error: ', this.userEmailErrorMessage);

        if (this.userEmailErrorMessage.length === 0) {
          this.profileService.updateUserEmail(this.userEmail, newUserEmail);
        }
      }
    }
    if (type === 'password') {
      const currentPassword = this.currentPassword.nativeElement.value;
      const newPassword = this.newPassword.nativeElement.value;
      const confirmNewPassword = this.confirmNewPassword.nativeElement.value;
      this.userPasswordErrorMessage = '';

      if (currentPassword && newPassword && confirmNewPassword) {

        if (!newPassword.match(/^(?=.*[\d])(?=.*[!@#$_%^&*])[\w!@#_$%^&*]{8,16}$/)) {
          this.userPasswordErrorMessage = 'New Password must be between 8 - 16 letters and contains special characters';
        }
        const userData = this.profileService.getUserData();
        const index = userData.findIndex(userData2 => userData2.email === this.userEmail);

        if (index >= 0) {
          const existingPassword = userData[index].password;
          if (existingPassword && existingPassword === currentPassword) {
            if (newPassword === confirmNewPassword) {
              this.profileService.updateUserPassword(this.userEmail, currentPassword, newPassword, confirmNewPassword);
            } else {
              this.userPasswordErrorMessage = 'New Password and Confirm_New_Password are not same';
            }
          } else {
            this.userPasswordErrorMessage = 'New Password and Existing Password are not same';
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
  }

}
