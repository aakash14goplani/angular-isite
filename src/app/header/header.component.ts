import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { ProjectService } from '../project/project.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy, OnInit {

  private routerSubscription: Subscription;
  private projectNameSubscription: Subscription;
  private isNormalHeader: boolean = false;
  private spanSideNavClass: string = 'navbar-nav animate side-nav';
  private expandNavigation: boolean = false;
  private userName: string = 'My Account';
  private currentProjectName: string = 'Contents:';

  constructor(
    private router: Router,
    private authService: AuthService,
    private coreProjectService: ProjectService
  ) {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // console.log('Current URL: ', event.url);
        this.isNormalHeader = (event.url != null && event.url !== '/project' && event.url !== '/project/details') ? true : false;
        // console.log('Normal Header: ', this.isNormalHeader);
      }
    });
  }

  ngOnInit(): void {
    const userData: {
      email: string,
      name: string,
      token: string,
      tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      this.userName = userData.name;
    }

    if (this.coreProjectService.globalProjectName) {
      this.projectNameSubscription = this.coreProjectService.globalProjectName.subscribe((projectName: string) => {
        this.currentProjectName = projectName;
      });
    }
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

  private logoutUser(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.projectNameSubscription.unsubscribe();
  }

}
