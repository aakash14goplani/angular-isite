import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectMaterialInwardService, MaterialInwardsStructure } from './project-material-inward.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-material-inward',
  templateUrl: './project-material-inward.component.html',
  styleUrls: ['./project-material-inward.component.css'],
  providers: [ ProjectMaterialInwardService ]
})
export class ProjectMaterialInwardComponent implements OnInit, OnDestroy {

  constructor(
    private projectMaterialInwardService: ProjectMaterialInwardService
  ) { }

  tempMap = new Map<Date, MaterialInwardsStructure[]>();
  /* variable used to store current k-v pair that will be passed to update-material component */
  currentKey: Date;
  currentValue: string[];

  isDataUpdating: boolean = false;
  isDataAdding: boolean = false;

  private updateSubscription: Subscription;
  private addSubscription: Subscription;
  private dprDataSubscription: Subscription;

  ngOnInit(): void {

    this.tempMap = this.projectMaterialInwardService.getProcessedMaterialData();
    this.dprDataSubscription = this.projectMaterialInwardService.materialChange.subscribe((dprArray) => {
      this.tempMap = dprArray;
    });
    
    this.updateSubscription = this.projectMaterialInwardService.isUpdateMode.subscribe((status: boolean) => {
      this.isDataUpdating = status;
    });

    this.addSubscription = this.projectMaterialInwardService.isAddMode.subscribe((status: boolean) => {
      this.isDataAdding = status;
    });
  }

  updateProjectMaterial(key, value): void {
    this.currentKey = key;
    this.currentValue = value;
    this.isDataUpdating = true;
    this.projectMaterialInwardService.isUpdateMode.next(true);
  }

  maintainOrder(a, b): number {
    return 0;
  }

  addNewMaterail(): void {
    this.isDataAdding = true;
    this.projectMaterialInwardService.isAddMode.next(true);
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
    this.addSubscription.unsubscribe();
    this.dprDataSubscription.unsubscribe();
  }

}
