import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProjectDetailsService } from './project-details.service';
import { Observable, of, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsResolverService implements Resolve<Array<{ name: string, date: Date }>> {

  constructor(
    private projectDetailsService: ProjectDetailsService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<{ name: string, date: Date }>>  {
    return of(this.projectDetailsService.projectDetails());
  }
}
