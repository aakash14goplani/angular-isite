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
        // console.log('Normal Header: ', this.isNormalHeader);
      }
    });
  }

  private test() {
    this.expandNavigation = !this.expandNavigation;
    if (this.expandNavigation) {
      this.spanSideNavClass = 'navbar-nav animate side-nav open';
    } else {
      this.spanSideNavClass = 'navbar-nav animate side-nav';
    }
  }

  private toggleClassValue(option?: string): void {
    if (option != null && option === 'false') {
      this.expandNavigation = false;
    } else {
      this.expandNavigation = !this.expandNavigation;
    }
    const navigationType: string = document.documentElement.scrollWidth > 991 ? 'side' : 'top';

    if (navigationType != null && navigationType === 'top') {
      if (this.expandNavigation) {
        this.buttonTopNavClass = 'navbar-toggler';
        this.divTopNavClass = 'collapse navbar-collapse show';
      } else {
        this.buttonTopNavClass = 'navbar-toggler collapsed';
        this.divTopNavClass = 'collapse navbar-collapse';
      }
    }

    if (navigationType != null && navigationType === 'side') {
      if (this.expandNavigation) {
        this.spanSideNavClass = 'navbar-nav animate side-nav open';
      } else {
        this.spanSideNavClass = 'navbar-nav animate side-nav';
      }
    }

    console.log('Final Values');
    console.log('option: ', option, ', type: ', typeof option);
    console.log('position: ', navigationType, ', expand: ', this.expandNavigation);
    console.log('buttonTopNavClass: ', this.buttonTopNavClass);
    console.log('divTopNavClass: ', this.divTopNavClass);
    console.log('spanSideNavClass: ', this.spanSideNavClass);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

}
