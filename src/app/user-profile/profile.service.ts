import { Injectable, OnInit } from '@angular/core';
import { UserService } from '../core/user-service/user-service.service';
import { Router } from '@angular/router';
import { User } from '../authentication/user.model';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class ProfileService {

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) { }

  private userDataFromStorage: {
    email: string,
    name: string,
    token: string,
    tokenExpirationDate: string
  };

  public getUserData(): Array<{ name: string, email: string, password: string }> {
    return this.userService.getUserData();
  }

  public updateUserName(name: string, email: string): void {
    this.userService.updateUserName(name, email);
    this.updateStorageDetails(email, name);
    console.log('name updated: ', this.userService.getUserData());
  }

  public updateUserEmail(currentEmail: string, newEmail: string): void {
    this.userService.updateUserEmail(currentEmail, newEmail);
    this.updateStorageDetails(newEmail, '');
    console.log('email updated: ', this.userService.getUserData());
  }

  public updateUserPassword(userEmail: string, currentPassword: string, newPassword: string, confirmNewPassword: string): void {
    this.userService.updateUserPassword(userEmail, newPassword);
    console.log('password updated: ', this.userService.getUserData());
  }

  private updateStorageDetails(email: string, name: string): void {
    this.userDataFromStorage = JSON.parse(localStorage.getItem('userData'));
    if (this.userDataFromStorage) {
      const userName = (name.length > 0) ? name : this.userDataFromStorage.name;
      const token: string = this.userDataFromStorage.token;
      const expiryDate: Date = new Date(this.userDataFromStorage.tokenExpirationDate);
      const user = new User(email, userName, token, expiryDate);
      this.authService.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }
}
