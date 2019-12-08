import { Injectable } from '@angular/core';

@Injectable()
export class ProjectDprService {

  constructor() { }

  private projectDPRDataStotre: Array<{date: Date, category: string, type: string, content: number}> = [
    { date: new Date('2017-7-10'), category: 'Labour', type: 'Male', content: 1 },
    { date: new Date('2018-8-18'), category: 'Labour', type: 'Female', content: 2 },
    { date: new Date(), category: 'Labour', type: 'NW', content: 3 },
    { date: new Date('2017-7-10'), category: 'Machinery', type: 'Poclain', content: 1 },
    { date: new Date('2018-8-18'), category: 'Machinery', type: 'Dumper', content: 2 },
    { date: new Date(), category: 'Machinery', type: 'JCB', content: 3 },
    { date: new Date('2018-8-18'), category: 'Material', type: 'Murum', content: 1 },
    { date: new Date(), category: 'Material', type: 'RMC M20', content: 2 },
    { date: new Date('2017-7-10'), category: 'Activity', type: 'Earthwork filing', content: -1 },
    { date: new Date('2018-8-18'), category: 'Activity', type: 'Rock breaking', content: -1 },
    { date: new Date(), category: 'Activity', type: 'SWD Wall', content: -1 }
  ];

  public getProjectDPRData(): Array<{date: Date, category: string, type: string, content: number}> {
    return this.projectDPRDataStotre.slice();
  }

  public setProjectDPRData(date: Date, category: string, type: string, content: number): void {
    this.projectDPRDataStotre.push({date: date, category: category, type: type, content: content});
  }
}
