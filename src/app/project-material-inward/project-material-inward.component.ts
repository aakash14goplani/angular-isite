import { MaterialInwardResponse } from './../services/response/fetchMaterialInwardReponse';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectMaterialInwardService } from './project-material-inward.service';
import {  MaterialInwardsStructure } from '../services/request/createMaterialInwardRequest';
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

  tempMap: MaterialInwardsStructure[];
  /* variable used to store current k-v pair that will be passed to update-material component */
  currentKey: Date;
  currentValue: string[];

  isDataUpdating: boolean = false;
  isDataAdding: boolean = false;
  isDataLoading: boolean = false;

  private updateSubscription: Subscription;
  private addSubscription: Subscription;
  private materialInwardSubscription: Subscription;

  ngOnInit(): void {
    this.isDataLoading = true;
    this.projectMaterialInwardService.getProcessedMaterialData().subscribe((data: MaterialInwardResponse) => {
      if(data.message === "Success") {
        this.tempMap = this.projectMaterialInwardService.processMaterialData(data.content);
        console.log(this.tempMap);
        this.projectMaterialInwardService.setProjectMaterialData(data.content);
      }
      this.isDataLoading = false;
    });
    this.materialInwardSubscription = this.projectMaterialInwardService.materialChange.subscribe((materialArray) => {
      this.tempMap = materialArray;
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
    this.materialInwardSubscription.unsubscribe();
  }

}
