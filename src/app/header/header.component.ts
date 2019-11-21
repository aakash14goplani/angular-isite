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

  private toggleSideNav() {
    this.expandNavigation = !this.expandNavigation;
    if (this.expandNavigation) {
      this.spanSideNavClass = 'navbar-nav animate side-nav open';
    } else {
      this.spanSideNavClass = 'navbar-nav animate side-nav';
    }
  }

  private toggleClassValue(event: any): void {
    const toggleClass: boolean = document.documentElement.scrollWidth > 991 ? false : true;
    const element: HTMLElement = document.querySelector('.navbar-toggler') as HTMLElement;
    if (toggleClass) {
      event.preventDefault();
      element.click();
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

}
