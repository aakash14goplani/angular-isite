import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectDprService } from './project-dpr.service';
import { Subscription, Observable } from 'rxjs';
import { FetchDprResponse, Content } from '../services/response/fetchDprResponse';

@Component({
  selector: 'app-project-dpr',
  templateUrl: './project-dpr.component.html',
  styleUrls: ['./project-dpr.component.css'],
  providers: [ ProjectDprService ]
})
export class ProjectDprComponent implements OnInit, OnDestroy {
  fetchDprResponse : FetchDprResponse;
  constructor(
    private projectDPRService: ProjectDprService
  ) { }

  tempMap = new Map<Date, string[]>();
  /* variable used to store current k-v pair that will be passed to edit-dpr component */
  currentKey: Date;
  currentValue: string[];
  isLoading: boolean = false;

  isDataUpdating: boolean = false;
  isDataAdding: boolean = false;

  private updateSubscription: Subscription;
  private addSubscription: Subscription;
  private dprDataSubscription: Subscription;

  ngOnInit(): void {
    this.isLoading = true;
    this.projectDPRService.getProcessedProjectDPRData().subscribe((data: FetchDprResponse) => {
      if(data.message === 'Success' && data.content && data.content.length > 0) {
        this.projectDPRService.setProjectDPRData(data.content);
        this.tempMap = this.projectDPRService.processProjectDPRData(data.content);
      }
      this.isLoading = false;
    });
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

  updateProjectDPR(key, value): void {
    this.currentKey = key;
    this.currentValue = value;
    this.isDataUpdating = true;
    this.projectDPRService.isUpdateMode.next(true);
  }

  maintainOrder(a, b): number {
    return 0;
  }

  addNewDPR(): void {
    this.isDataAdding = true;
    this.projectDPRService.isAddMode.next(true);
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
    this.addSubscription.unsubscribe();
    this.dprDataSubscription.unsubscribe();
  }

}
