import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router
  ) { }

  /* dummy user_data, replace this with firestore database */
  private userDataStore: Array<{name: string, email: string, password: string}> = [
    { name: 'Aakash', email: 'test@test.test', password: 'test@123' },
    { name: 'Sumit', email: 'sumit@test.test', password: 'test@123' },
    { name: 'Ashish', email: 'ashish@test.test', password: 'test@123' }
  ];

  /* subject to refresh component whenever user-date changes */
  private userDataChanged = new Subject<Array<{name: string, email: string, password: string}>>();

  /* return shallow-copy of user_data array */
  public getUserData(): Array<{name: string, email: string, password: string}> {
    return this.userDataStore.slice();
  }

  public setUserData(name: string, email: string, password: string): Observable<string> {
    if (!this.validateUserEmailExists(email)) {
      this.userDataStore.push({ name, email, password });
      this.userDataChanged.next(this.userDataStore);
      return of('SUCCESS');
    }
    return of('EMAIL_EXISTS');
  }

  public updateUserName(name: string, email: string): void {
    const arrayIndex = this.userDataStore.findIndex(userData => userData.email === email);
    if (arrayIndex >= 0) {
      this.userDataStore[arrayIndex].name = name;
    }
    this.userDataChanged.next(this.userDataStore);
  }

  public updateUserEmail(existingMail: string, email: string): void {
    const arrayIndex = this.userDataStore.findIndex(userData => userData.email === existingMail);
    if (arrayIndex >= 0) {
      this.userDataStore[arrayIndex].email = email;
    }
    this.userDataChanged.next(this.userDataStore);
  }

  public updateUserPassword(email: string, password: string): void {
    const arrayIndex = this.userDataStore.findIndex(userData => userData.email === email);
    if (arrayIndex >= 0) {
      this.userDataStore[arrayIndex].password = password;
    }
    this.userDataChanged.next(this.userDataStore);
  }

  public deleteUserData(email: string): void {
    const arrayIndex = this.userDataStore.findIndex(userData => userData.email === email);
    if (arrayIndex >= 0) {
      this.userDataStore.splice(arrayIndex, 1);
    }
    this.userDataChanged.next(this.userDataStore);
  }

  /* check if user with give email and password combination exists and return results as observable */
  public checkEmailPasswordCombination(email: string, password: string): Observable<boolean> {
    let isValidUser: boolean = false;
    const arrayIndex = this.userDataStore.findIndex(userData => userData.email === email);
    if (arrayIndex >= 0 && this.userDataStore[arrayIndex].password === password) {
      isValidUser = true;
    }
    return of(isValidUser);
  }

  public getUserName(email: string): string {
    let userName: string = '';
    const arrayIndex = this.userDataStore.findIndex(userData => userData.email === email);
    if (arrayIndex >= 0) {
      userName = this.userDataStore[arrayIndex].name;
    }
    return userName;
  }

  /* avoid registering duplicate users */
  public validateUserEmailExists(email: string): boolean {
    let errorToken: boolean = false;

    for (const user of this.userDataStore) {
      if (user.email === email) {
        errorToken = true;
        break;
      }
    }

    return errorToken;
  }

  public authenticateUser(email: string, password: string): void {
    for (const user of this.userDataStore) {
      if (user.email === email && user.password === password) {
        this.router.navigate(['project']);
      }
    }
    console.log('login failed!');
  }

  public registerUser(name: string, email: string, password: string): void {
    for (const user of this.userDataStore) {
      if (user.email === email) {
        // email already registered
        console.log('registeration failed: email already exists!');
        return;
      }
    }
    this.userDataStore.push({ name, email, password });
    this.router.navigate(['project']);
    console.log('registeration successfull', this.userDataStore.length);
  }
}
