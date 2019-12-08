import { Component, OnInit } from '@angular/core';
import { ProjectDprService } from './project-dpr.service';

@Component({
  selector: 'app-project-dpr',
  templateUrl: './project-dpr.component.html',
  styleUrls: ['./project-dpr.component.css'],
  providers: [ ProjectDprService ]
})
export class ProjectDprComponent implements OnInit {

  constructor(
    private projectDPRService: ProjectDprService
  ) { }

  private projectDPRArray: Array<{date: Date, category: string, type: string, content: number}>;
  private laboursArray: Array<{date: Date, category: string, type: string, content: number}>;
  private machineryArray: Array<{date: Date, category: string, type: string, content: number}>;
  private materialArray: Array<{date: Date, category: string, type: string, content: number}>;
  private activitiesArray: Array<{date: Date, category: string, type: string, content: number}>;

  private isDataUpdating: boolean = false;

  private laboursLastUpdatedDate: Date = new Date('2019-4-14');
  private machineryLastUpdatedDate: Date = new Date('2019-5-15');
  private materialLastUpdatedDate: Date = new Date('2019-6-16');
  private activitiesLastUpdatedDate: Date = new Date('2019-7-17');

  ngOnInit(): void {
    this.projectDPRArray = this.projectDPRService.getProjectDPRData();

    this.projectDPRArray.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      }
      if (a.date < b.date) {
        return -1;
      }
      return 0;
    });

    let tempMap = new Map<Date, Array<Array<{date: Date, category: string, type: string, content: number}>>>();
    let tempArray: Array<Array<{date: Date, category: string, type: string, content: number}>> = [];
    let currentDate: Date = this.projectDPRArray[0].date;
    tempArray.push(this.projectDPRArray);
    tempMap.set(currentDate, tempArray);
    let nextDate: Date = currentDate;
    for (let i = 1; i < this.projectDPRArray.length; i++) {
      nextDate = this.projectDPRArray[i].date;
      if (nextDate === currentDate) {
        // get key with existing date, append array to value
      } else {
        // insert new k-v pair
      }
    }


    this.laboursArray = this.projectDPRArray.filter((data) => {
      return data.category === 'Labour';
    });
    this.machineryArray = this.projectDPRArray.filter((data) => {
      return data.category === 'Machinery';
    });
    this.materialArray = this.projectDPRArray.filter((data) => {
      return data.category === 'Material';
    });
    this.activitiesArray = this.projectDPRArray.filter((data) => {
      return data.category === 'Activity';
    });

    console.log('this.projectDPRArray: ', this.projectDPRArray);
    console.log('this.laboursArray: ', this.laboursArray);
    console.log('this.machineryArray: ', this.machineryArray);
    console.log('this.materialArray: ', this.materialArray);
    console.log('this.activitiesArray: ', this.activitiesArray);
  }

  private updateProjectDPR(): void {
    const date: Date = new Date();
    const category: string = '';
    const type: string = '';
    const content: number = -1;
    this.projectDPRService.setProjectDPRData(date, category, type, content);
    this.isDataUpdating = true;
  }

  private cancelUpdate(): void {
    this.isDataUpdating = false;
  }

}
