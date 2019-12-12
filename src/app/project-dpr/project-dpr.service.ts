import { Injectable } from '@angular/core';

@Injectable()
export class ProjectDprService {

  constructor() { }

  private projectDPRDataStotre: Array<{date: Date, content: string}> = [
    { date: new Date('2019-7-10'), content: 'Concreting PCC for swd at ch 23575 to 23607 RHS' },
    { date: new Date('2019-7-11'), content: 'Concreting swd wall at ch 24410 to 2442, 24764 to 24775 RHS and 24373 LHS' },
    { date: new Date('2019-7-10'), content: 'Concreting PCC for swd at ch 24835 to 24859 LHS, 24795 to 24800 and  24437 to 24481 RHS' },
    { date: new Date('2019-7-9'), content: 'Shuttering for swd slab at ch 24169 to 24198 LHS in progress' },
    { date: new Date('2019-7-8'), content: 'cutting bending steel for swd slab' },
    { date: new Date('2019-7-10'), content: 'Concreting swd slab at ch 24198 to 24227 RHS' },
    { date: new Date('2019-7-8'), content: 'Concreting for Encasing HP culvert at ch 18620 RHS  1st lift' },
    { date: new Date('2019-7-9'), content: 'Concreting PCC for utility duct at ch 19260' },
    { date: new Date('2019-7-11'), content: 'Concreting swd wall at ch 24421 to 24432 RHS and 24530 to 24539 LHS ' },
    { date: new Date('2019-7-12'), content: 'Concreting for Encasing HP culvert 1st lift ch 18860 LHS' },
    { date: new Date('2019-7-12'), content: 'Soling for HP culvert at ch 24955' },
    { date: new Date('2019-7-11'), content: 'Soling for swd at ch 24830 to 24860 LHS.' },
    { date: new Date('2019-7-9'), content: 'Embankment grading and watering at ch 24750 to 24950.' },
    { date: new Date('2019-7-8'), content: 'Dressing excavated bed for HP culvert at ch 25060' },
    { date: new Date('2019-7-8'), content: 'Dressing excavated swd slab' },
    { date: new Date('2019-6-8'), content: 'Dressing excavated bed for HP culvert at ch 25060' }
  ];

  public getProjectDPRData(): Array<{date: Date, content: string}> {
    return this.projectDPRDataStotre.slice();
  }

  public setProjectDPRData(date: Date, content: string): void {
    this.projectDPRDataStotre.push({date: date, content: content});
  }
}
