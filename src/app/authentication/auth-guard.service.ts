import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const userDataFromStorage: {
      email: string,
      name: string,
      token: string,
      tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userDataFromStorage) {
      this.authService.user.next(null);
    }

    return this.authService.user.pipe(
      map((userData) => {
        const isAuth = !!userData;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/home']);
      })
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.canActivate(route, state);
  }

}
