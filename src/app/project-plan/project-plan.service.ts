import { Injectable } from '@angular/core';

@Injectable()
export class ProjectPlanService {

  constructor() { }

  private projectPlanDataStote: Array<{ name: string, contents: number }> = [
    { name: 'MNB', contents: 14 },
    { name: 'MJB', contents: 12 },
    { name: 'Carriageway', contents: 5 }
  ];

  public getProjectPlanDetails(): Array<{ name: string, contents: number }> {
    return this.projectPlanDataStote.slice();
  }
}
