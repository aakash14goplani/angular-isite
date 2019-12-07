import { Injectable } from '@angular/core';

@Injectable()
export class ProjectPlanService {

  constructor() { }

  private projectPlanDataStote: Array<{ name: string, contents: number, location: string, date: Date }> = [
    { name: 'MNB', contents: 14, location: 'drain', date: new Date('2017-8-23') },
    { name: 'MJB', contents: 12, location: 'bridge', date: new Date() },
    { name: 'Carriageway', contents: 5, location: 'carriageway', date: new Date('2028-8-23') }
  ];

  public getProjectPlanDetails(): Array<{ name: string, contents: number, location: string, date: Date }> {
    return this.projectPlanDataStote.slice();
  }
}
