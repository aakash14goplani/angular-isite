import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from '../core/user-service/user-service.service';
import { User } from '../authentication/user.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [ ProfileService ]
})
export class UserProfileComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  private subscription: Subscription;
  private userName: string = '';
  private userEmail: string = '';
  private token: string = '';
  private tokenExpirationDate: Date;
  private updateMessageForName: boolean = false;
  private nameMessage: string = 'Update User Name';
  private updateMessageForEmail: boolean = false;
  private emailMessage: string = 'Update User Email';
  @ViewChild('userNameInput', {static: false}) newUserName: ElementRef;
  @ViewChild('userEmailInput', {static: false}) newUserEmail: ElementRef;
  @ViewChild('currentPassword', {static: false}) currentPassword: ElementRef;
  @ViewChild('newPassword', {static: false}) newPassword: ElementRef;
  @ViewChild('confirmNewPassword', {static: false}) confirmNewPassword: ElementRef;

  ngOnInit() {
    this.subscription = this.authService.user.subscribe((userData) => {
      if (!!userData) {
        this.userEmail = userData.email;
        this.userName = userData.name;
        this.token = userData.getToken();
        this.tokenExpirationDate = userData.getTokenExpirationDate();
      }
    });
  }

  private updateUserDetails(type: string): void {
    if (type === 'name') {
      this.updateMessageForName = !this.updateMessageForName;
      this.nameMessage = (this.updateMessageForName) ? 'Cancel' : 'Update User Name';
    }
    if (type === 'email') {
      this.updateMessageForEmail = !this.updateMessageForEmail;
      this.emailMessage = (this.updateMessageForEmail) ? 'Cancel' : 'Update User Email';
    }
  }

  private updateValue(type: string) {
    if (type === 'name') {
      const newUserName = this.newUserName.nativeElement.value;
      if (newUserName) {
        this.userService.updateUserName(newUserName, this.userEmail);
        this.authService.user.next(new User(this.userEmail, newUserName, this.token, this.tokenExpirationDate));
        console.log('updated successfully');
      }
    }
    if (type === 'email') {
      const newUserEmail = this.newUserEmail.nativeElement.value;
      if (newUserEmail) {
        this.userService.updateUserEmail(this.userEmail, newUserEmail);
        this.authService.user.next(new User(newUserEmail, this.userName, this.token, this.tokenExpirationDate));
      }
    }
    if (type === 'password') {
      const currentPassword = this.currentPassword.nativeElement.value;
      const newPassword = this.newPassword.nativeElement.value;
      const confirmNewPassword = this.confirmNewPassword.nativeElement.value;

      if (currentPassword && newPassword && confirmNewPassword) {
        const userData = this.userService.getUserData();
        const index = userData.findIndex(userData => userData.email === this.userEmail);

        if (index >= 0) {
          const existingPassword = userData[index].password;
          if (existingPassword && existingPassword === currentPassword) {
            if (newPassword === confirmNewPassword) {
              this.userService.updateUserPassword(this.userEmail, newPassword);
              console.log('password updated: ', this.userService.getUserData());
            } else {
              /* data mismatch */
              console.log('new password and confirm_new_password are not same: ');
            }
          } else {
            /* password mismatch */
            console.log('new password and existing password are not same: ');
          }
        }
        
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
