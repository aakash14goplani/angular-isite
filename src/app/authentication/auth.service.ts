import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/user-service/user-service.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private timeOut: any;
  public authError: Subject<string> = new Subject<string>();

  constructor(
    private router: Router,
    private userService: UserService
  ) {  }

  public authenticateUser(email: string, password: string): void {
    let userAuthenticated = false;
    this.userService.checkEmailPasswordCombination(email, password).subscribe((flag: boolean) => {
      userAuthenticated = flag;
    });
    if (userAuthenticated) {
      this.authError.next('');
      this.processUserAndNavigate('login', email);
    } else {
      console.log('unable to login');
      this.authError.next('Invalid Credentials: unable to login');
    }
  }

  public registerUser(name: string, email: string, password: string): void {
    let messageToken = '';
    this.userService.setUserData(name, email, password).subscribe((message: string) => {
      messageToken = message;
    });
    if ('SUCCESS' === messageToken) {
      this.authError.next('');
      this.processUserAndNavigate('register', email);
    } else {
      console.log('unable to register');
      this.authError.next('Unable to register - data provided may already exists or is incorrect');
    }
  }

  public logout(): void {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.timeOut) {
        clearTimeout(this.timeOut);
    }
    this.timeOut = null;
    this.router.navigate(['/home']);
  }

  public autoLogin(): void {
    const userData: {
      email: string,
      name: string,
      token: string,
      tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const continueUserSession = new User(userData.email, userData.name, userData.token, new Date(userData.tokenExpirationDate));
    if (continueUserSession.getToken()) {
      this.user.next(continueUserSession);
      const sessionExpiryData = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(sessionExpiryData);
      /* redirect user automatically, e.g. if user is logged in on one window and opens new session
      in other window, he should be forced to continue with its existing session */
      // this.router.navigate(['project']);
    }
  }

  public autoLogout(expirationDuration: number): void {
    this.timeOut = setTimeout(() => {
        this.logout();
    }, expirationDuration);
  }

  private processUserAndNavigate(type: string, email: string): void {
    const userName = this.userService.getUserName(email);
    const expiresIn: number = 3600000; // 60 minutes in millis
    const expiryDate = new Date(new Date().getTime() + expiresIn);
    const user = new User(email, userName, this.generateToken(), expiryDate);
    setTimeout(() => {
      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
      this.router.navigate(['project']);
    }, 2000);
  }

  private generateToken(): string {
    let result: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_+-=*!@#$';
    const charactersLength = characters.length;
    for (let i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
