import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/user-service/user-service.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  /* avoid registering duplicate users */
  public validateUserEmailExists(name: string, email: string): string {
    const errorToken: string = 'SUCCESS';

    /* for (const user of this.userDataStore) {
      if (user.email === email) {
        errorToken = 'EMAIL_EXISTS';
        break;
      }
    } */

    return errorToken;
  }

  public authenticateUser(email: string, password: string): void {
    let userAuthenticated = false;
    this.userService.checkEmailPasswordCombination(email, password).subscribe((flag: boolean) => {
      userAuthenticated = flag;
    });

    if (userAuthenticated) {
      const userName = this.userService.getUserName(email);
      const expiresIn: number = 1800000; // 30 minutes in millis
      const expiryDate = new Date(new Date().getTime() + expiresIn);
      const user = new User(userName, email, this.generateToken(), expiryDate);
      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
    } else {
      /* ERROR alert message: unable to login */
    }
  }

  private generateToken(): string {
    let result: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_+-=?*/!@#$%^&';
    const charactersLength = characters.length;
    for (let i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public registerUser(name: string, email: string, password: string): void {
    /* for (const user of this.userDataStore) {
      if (user.email === email) {
        // email already registered
        console.log('registeration failed: email already exists!');
        return;
      }
    }
    this.userDataStore.push({ name, email, password });
    this.router.navigate(['project']);
    console.log('registeration successfull', this.userDataStore.length); */
  }
}
