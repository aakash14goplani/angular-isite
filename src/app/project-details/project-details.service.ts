import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/* initially this service was provided at component level but was then shifted to root level to
 implemet route-resolver */
export class ProjectDetailsService {

  constructor() { }

  public additionMode: Subject<boolean> = new Subject<boolean>();
  public dataChanged: Subject<Array<{ name: string, date: Date }>> = new Subject<Array<{ name: string, date: Date }>>();

  private projectDetailsDataStore: Array<{ name: string, date: Date }> = [
    { name: 'Kalyan Ring Road', date: new Date('11/06/2019') },
    { name: 'Ulhasnagar Ring Road', date: new Date('11/07/2019') }
  ];

  public projectDetails(): Array<{ name: string, date: Date }> {
    return this.projectDetailsDataStore.slice();
  }

  public addProjectDetails(projectName: string, date: Date) {
    this.projectDetailsDataStore.push({name: projectName, date: date});
    this.dataChanged.next(this.projectDetailsDataStore);
  }

  public deleteProjectDetails(index: number): void {
    this.projectDetailsDataStore.splice(index, 1);
    this.dataChanged.next(this.projectDetailsDataStore);
  }
}
