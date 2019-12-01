import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-legal-notice',
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.css']
})
export class LegalNoticeComponent implements OnInit, OnDestroy {

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
