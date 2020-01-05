import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ProjectMaterialInwardService {

  constructor() { }

  private materialsDataStore: Array<MaterialInwardsStructure> = [
    { inward_date: new Date('2020-1-1'), materials: [
        { name: 'Concrete', quantity: 20 },
        { name: 'Steel', quantity: 10 }
      ]
    },
    { inward_date: new Date('2018-12-31'), materials: [
        { name: 'Fly Ash', quantity: 30 }
      ]
    },
    { inward_date: new Date('2019-12-31'), materials: [
        { name: 'Concrete', quantity: 20 },
        { name: 'Steel', quantity: 10 },
        { name: 'Fly Ash', quantity: 30 }
      ]
    }
  ];

  public isUpdateMode = new Subject<boolean>();
  public isAddMode = new Subject<boolean>();
  public materialChange = new Subject<Map<Date, MaterialInwardsStructure[]>>();

  public getMaterials(): Array<MaterialInwardsStructure> {
    return this.materialsDataStore.slice();
  }

  public setProjectMaterialData(array: MaterialInwardsStructure[]): void {
    this.materialsDataStore = array;
  }

  public addProjectMaterialData(date: Date, materails: {name: string, quantity: number}[]): void {
    this.materialsDataStore.push({inward_date: date, materials: materails});
  }

  public getProcessedMaterialData(): Map<Date, MaterialInwardsStructure[]> {
    return this.processMaterialData(this.materialsDataStore.slice());
  }

  private processMaterialData(ProjectMaterialArray: MaterialInwardsStructure[]): Map<Date, MaterialInwardsStructure[]> {
    ProjectMaterialArray.sort((a, b) => {
      if (a.inward_date > b.inward_date) {
        return -1;
      }
      if (a.inward_date < b.inward_date) {
        return 1;
      }
      return 0;
    });

    let tempArray = [];
    let tempMap = new Map<Date, MaterialInwardsStructure[]>();
    let currentDate: Date = null;
    let nextDate: Date = null;
    let lastDate: Date = null;

    for (let i = 0; i < ProjectMaterialArray.length - 1; i++) {
      currentDate = new Date(ProjectMaterialArray[i].inward_date);
      nextDate = new Date(ProjectMaterialArray[i+1].inward_date);
      
      tempArray.push(ProjectMaterialArray[i].materials);

      if (currentDate.getTime() !== nextDate.getTime()) {
        tempMap.set(currentDate, tempArray);
        tempArray = [];
      }

      lastDate = nextDate;
    }

    tempArray.push(ProjectMaterialArray[ProjectMaterialArray.length - 1].materials);
    tempMap.set(lastDate, tempArray);

    return tempMap;
  }
}

export interface MaterialInwardsStructure {
  inward_date: Date;
  materials: Array<{ name: string, quantity: number }>;
}
