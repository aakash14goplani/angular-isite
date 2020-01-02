import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService
  ) { }

  isUserLoggedIn: boolean = false;
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
