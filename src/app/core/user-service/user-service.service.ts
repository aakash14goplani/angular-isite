import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router
  ) { }

  private userDataStore: Array<{name: string, email: string, password: string}> = [
    { name: 'Aakash', email: 'test@test.test', password: 'test@123' },
    { name: 'Sumit', email: 'sumit@test.test', password: 'test@123' },
    { name: 'Ashish', email: 'ashish@test.test', password: 'test@123' }
  ];

  public getUserData(): Array<{name: string, email: string, password: string}> {
    return this.userDataStore.slice();
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
