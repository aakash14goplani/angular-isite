import { Injectable } from '@angular/core';

@Injectable()
export class ProjectPlanService {

  constructor() { }

  private projectPlanDataStote: Array<{ name: string, contents: number, location: string, date: Date }> = [
    { name: 'MNB', contents: 14, location: 'drain', date: new Date('2017-8-23') },
    { name: 'MNB 2', contents: 15, location: 'drain', date: new Date('2017-9-23') },
    { name: 'MNB 3', contents: 16, location: 'drain', date: new Date('2017-1-23') },
    { name: 'MNB 4', contents: 17, location: 'drain', date: new Date('2017-3-23') },
    { name: 'MJB', contents: 12, location: 'bridge', date: new Date() },
    { name: 'MJB 2', contents: 13, location: 'bridge', date: new Date('2018-3-15') },
    { name: 'MJB 3', contents: 10, location: 'bridge', date: new Date('2019-7-12') },
    { name: 'Carriageway', contents: 5, location: 'carriageway', date: new Date('2028-8-23') },
    { name: 'Carriageway 2', contents: 6, location: 'carriageway', date: new Date('2020-8-23') },
  ];

  public getProjectPlanDetails(): Array<{ name: string, contents: number, location: string, date: Date }> {
    return this.projectPlanDataStote.slice();
  }
}
