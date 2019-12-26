import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectDprService } from './project-dpr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-dpr',
  templateUrl: './project-dpr.component.html',
  styleUrls: ['./project-dpr.component.css'],
  providers: [ ProjectDprService ]
})
export class ProjectDprComponent implements OnInit, OnDestroy {

  constructor(
    private projectDPRService: ProjectDprService
  ) { }

  private projectDPRArray: Array<{date: Date, content: string}>;
  private tempMap = new Map<Date, Array<{content: string}>>();
  private newProjectDate: Date = new Date();
  /* variable used to store current k-v pair that will be passed to edit-dpr component */
  private currentKey: Date;
  private currentValue: string[];

  private isDataUpdating: boolean = false;
  private isDataAdding: boolean = false;
  private arrayToAddDPRNotes: number[] = [1];

  private updateSubscription: Subscription;
  private dprDataSubscription: Subscription;

  ngOnInit(): void {
    this.projectDPRArray = this.projectDPRService.getProjectDPRData();
    console.log('initial: ', this.projectDPRArray.length);
    this.dprDataSubscription = this.projectDPRService.dprDataChange.subscribe((dprArray) => {
      console.log('dprArray', dprArray);
      this.projectDPRArray = dprArray;
      console.log('this.projectDPRArray', this.projectDPRArray);
    });
    this.projectDPRService.isUpdateMode.next(false);

    this.updateSubscription = this.projectDPRService.isUpdateMode.subscribe((status: boolean) => {
      this.isDataUpdating = status;
    });

    console.log('final: ', this.projectDPRArray.length);

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

  private updateProjectDPR(key, value): void {
    this.currentKey = key;
    this.currentValue = value;
    /* logic for updating */
    const date: Date = new Date();
    const content: string = '';
    this.projectDPRService.setProjectDPRData(date, content);
    this.isDataUpdating = true;
    this.projectDPRService.isUpdateMode.next(true);
  }

  private cancelUpdate(): void {
    this.isDataUpdating = false;
  }

  private maintainOrder(a, b): number {
    return 0;
  }

  private addDPRReport(): void {
    this.isDataAdding = true;
  }

  private addDPRNotes(): void {
    let lastElementValue = this.arrayToAddDPRNotes[this.arrayToAddDPRNotes.length - 1];
    this.arrayToAddDPRNotes.push((lastElementValue) ? (lastElementValue + 1) : 1);
  }

  private cancelCurrentNote(index: number): void {
    this.arrayToAddDPRNotes.splice(index, 1);
  }

  private cancelDataAddition(): void {
    this.isDataAdding = false;
  }

  private addNewDPR(): void {
    this.isDataAdding = false;
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
    this.dprDataSubscription.unsubscribe();
  }

}
