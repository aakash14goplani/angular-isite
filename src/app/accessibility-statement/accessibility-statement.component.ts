import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accessibility-statement',
  templateUrl: './accessibility-statement.component.html',
  styleUrls: ['./accessibility-statement.component.css']
})
export class AccessibilityStatementComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService
  ) { }

  private isUserLoggedIn: boolean = false;
  private subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe((userData) => {
      this.isUserLoggedIn = (!!userData) ? true : false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
