import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user-service/user-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private userService: UserService,
  ) { }
  // tslint:disable: no-inferrable-types
  private isLoginMode: boolean = false;

  ngOnInit(): void {}

  private switchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  private onSubmit(formData: NgForm): void {
    // console.log(formData);
    const userEmail = formData.value.email;
    const userPassword = formData.value.password;
    const userName = formData.value.username;
    formData.reset();

    if (this.isLoginMode) {
      // login user
      console.log('logging user...');
      this.userService.authenticateUser(userEmail, userPassword);
    } else {
      // register user
      console.log('regestering user...');
      this.userService.registerUser(userName, userEmail, userPassword);
    }
  }

}
