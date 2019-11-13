import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent implements OnInit {

  constructor() { }

  // tslint:disable: no-inferrable-types
  private buttonTopNavClass: string = 'navbar-toggler collapsed';
  private divTopNavClass: string = 'collapse navbar-collapse';
  private spanSideNavClass: string = 'navbar-nav animate side-nav';
  private expandNavigation: boolean = false;

  ngOnInit() {}

  private toggleClassValue(navigationType: string): void {
    this.expandNavigation = !this.expandNavigation;
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

}
