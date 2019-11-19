import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {

  // tslint:disable: no-inferrable-types
  private routerSubscription: Subscription;
  private isNormalHeader: boolean = false;
  private buttonTopNavClass: string = 'navbar-toggler collapsed';
  private divTopNavClass: string = 'collapse navbar-collapse';
  private spanSideNavClass: string = 'navbar-nav animate side-nav';
  private expandNavigation: boolean = false;

  constructor(private router: Router) {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // console.log('Current URL: ', event.url);
        this.isNormalHeader = (event.url != null && event.url !== '/project' && event.url !== '/project/details') ? true : false;
        this.toggleClassValue(document.documentElement.scrollWidth > 991 ? 'side' : 'top');
        console.log('Normal Header: ', this.isNormalHeader);
      }
    });
  }

  private toggleClassValue(navigationType: string): void {
    this.expandNavigation = !this.expandNavigation;
    console.log('called for: ', navigationType);

    if (navigationType === 'top') {
      if (this.expandNavigation) {
        this.buttonTopNavClass = 'navbar-toggler';
        this.divTopNavClass = 'collapse navbar-collapse show';
      } else {
        this.buttonTopNavClass = 'navbar-toggler collapsed';
        this.divTopNavClass = 'collapse navbar-collapse';
      }
    }

    if (navigationType === 'side') {
      if (this.expandNavigation) {
        this.spanSideNavClass = 'navbar-nav animate side-nav open';
      } else {
        this.spanSideNavClass = 'navbar-nav animate side-nav';
      }
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

}
