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

  private projectDPRArray: Array<{date: Date, content: string}>;
  private tempMap = new Map<Date, Array<{content: string}>>();
  private newProjectDate: Date = new Date();

  private isDataUpdating: boolean = false;
  private isDataAdding: boolean = false;
  private arrayToAddDPRNotes: number[] = [1];

  ngOnInit(): void {
    this.projectDPRArray = this.projectDPRService.getProjectDPRData();

    this.projectDPRArray.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }
      return 0;
    });

    let tempArray = [];
    let currentDate: Date = new Date(this.projectDPRArray[0].date);
    let nextDate: Date = new Date(this.projectDPRArray[1].date);

    for (let i = 1; i <= this.projectDPRArray.length - 1; i++) {
      tempArray.push(this.projectDPRArray[i].content);

      if (currentDate.getTime() !== nextDate.getTime()) {
        this.tempMap.set(currentDate, tempArray);
        tempArray = [];
      }

      currentDate = new Date(this.projectDPRArray[i].date);
      if ((i+1) < this.projectDPRArray.length) {
        nextDate = new Date(this.projectDPRArray[i+1].date);
      } else {
        nextDate = new Date(this.projectDPRArray[i].date);
      }
    }

    tempArray.push(this.projectDPRArray[this.projectDPRArray.length - 1].content);
    this.tempMap.set(currentDate, tempArray);
  }

  private updateProjectDPR(): void {
    const date: Date = new Date();
    const content: string = '';
    this.projectDPRService.setProjectDPRData(date, content);
    this.isDataUpdating = true;
  }

  private cancelUpdate(): void {
    this.isDataUpdating = false;
  }

  private maintainOrder(a, b): number {
    return 0;
  }

  private addDPRReport(): void {
    this.isDataAdding = true;
    let variable: string = 'aakash';
  }

  private addDPRNotes(): void {
    this.arrayToAddDPRNotes.push(1);
  }

  private cancelCurrentNote(index: number): void {
    // console.log('remove element from position: ' + index);
    // console.log('remove element: ' + this.arrayToAddDPRNotes.indexOf(index));
    console.log(this.arrayToAddDPRNotes);
    this.arrayToAddDPRNotes.splice(index, 1);
  }

  private cancelDataAddition(): void {
    this.isDataAdding = false;
  }

  private addNewDPR(): void {
    this.isDataAdding = false;
  }

}
