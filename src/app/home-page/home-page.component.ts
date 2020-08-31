import { Component, AfterViewChecked, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService
  ) { }

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  /* Adding subject to force refresh component on every switch between login / register. Here class
  will toggle between `form-control` and `form-control register`, this will prevent angular from
  adding validation classsed `ng-invalid`, `ng-error` etc and the validation message won't deisplay
  comment till find alternate solution!

  private formClass: string = 'form-control register';
  private subjectFormClass: Subject<string> = new Subject<string>(); */
  authSubscription: Subscription;
  errorMessage: string = '';

  ngOnInit(): void {
    this.authSubscription = this.authService.authError.subscribe((authStatus: string) => {
       this.errorMessage = authStatus;
       if (this.errorMessage.length > 0) {
         this.isLoading = false;
       }
    });
  }

  switchMode(): void {
    this.isLoginMode = !this.isLoginMode;
    /* if (this.isLoginMode) {
      this.formClass = 'form-control';
      this.subjectFormClass.next(this.formClass);
    } else {
      this.formClass = 'form-control register';
      this.subjectFormClass.next(this.formClass);
    } */
  }

  onSubmit(formData: NgForm): void {
    // console.log(formData);
    const userEmail = formData.value.email;
    const userPassword = formData.value.password;
    const userName = formData.value.username;
    formData.reset();

    if (this.isLoginMode) {
      // login user
      this.isLoading = true;
      this.errorMessage = '';
      this.authService.authenticateUser(userEmail, userPassword);
    } else {
      // register user
      this.isLoading = true;
      this.errorMessage = '';
      this.authService.registerUser(userName, userEmail, userPassword);
    }
  }

  closePopUp(): void {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
