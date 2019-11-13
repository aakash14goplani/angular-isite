import { Injectable } from '@angular/core';
import { ProjectDetailsComponent } from './project-details.component';

@Injectable()
export class ProjectDetailsService {

  constructor() { }

  private projectDetailsDataStore: Array<{ name: string, date: Date }> = [
    { name: 'Kalyan Ring Road', date: new Date('11/06/2019') },
    { name: 'Ulhasnagar Ring Road', date: new Date('11/07/2019') }
  ];

  public projectDetails(): Array<{ name: string, date: Date }> {
    return this.projectDetailsDataStore.slice();
  }
}
