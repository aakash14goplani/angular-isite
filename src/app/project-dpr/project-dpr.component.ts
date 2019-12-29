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

  private tempMap = new Map<Date, string[]>();
  /* variable used to store current k-v pair that will be passed to edit-dpr component */
  private currentKey: Date;
  private currentValue: string[];

  private isDataUpdating: boolean = false;
  private isDataAdding: boolean = false;

  private updateSubscription: Subscription;
  private addSubscription: Subscription;
  private dprDataSubscription: Subscription;

  ngOnInit(): void {
    this.tempMap = this.projectDPRService.getProcessedProjectDPRData();
    this.dprDataSubscription = this.projectDPRService.dprDataChange.subscribe((dprArray) => {
      this.tempMap = dprArray;
    });
    
    this.updateSubscription = this.projectDPRService.isUpdateMode.subscribe((status: boolean) => {
      this.isDataUpdating = status;
    });

    this.addSubscription = this.projectDPRService.isAddMode.subscribe((status: boolean) => {
      this.isDataAdding = status;
    });
  }

  private updateProjectDPR(key, value): void {
    this.currentKey = key;
    this.currentValue = value;
    this.isDataUpdating = true;
    this.projectDPRService.isUpdateMode.next(true);
  }

  private maintainOrder(a, b): number {
    return 0;
  }

  private addNewDPR(): void {
    this.isDataAdding = true;
    this.projectDPRService.isAddMode.next(true);
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
    this.addSubscription.unsubscribe();
    this.dprDataSubscription.unsubscribe();
  }

}
