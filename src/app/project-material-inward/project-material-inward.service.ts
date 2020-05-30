import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MaterialInwardsStructure, Materials } from '../services/request/createMaterialInwardRequest';
import { HttpClient } from '@angular/common/http';
import { IsiteHttp } from '../api-config';

@Injectable()
export class ProjectMaterialInwardService {

  constructor(private httpClient: HttpClient) { }

  private materialsDataStore: Array<MaterialInwardsStructure> = [
    /* { inward_date: new Date('2020-1-1'), materials: [
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
    } */
  ];

  public isUpdateMode = new Subject<boolean>();
  public isAddMode = new Subject<boolean>();
  public materialChange = new Subject<MaterialInwardsStructure[]>();

  public getMaterials(): Array<MaterialInwardsStructure> {
    return this.materialsDataStore.slice();
  }

  public setProjectMaterialData(array: MaterialInwardsStructure[]): void {
    this.materialsDataStore = array;
  }

  public addProjectMaterialData(material: MaterialInwardsStructure): void {
    this.materialsDataStore.push(material);
  }

  public getProcessedMaterialData(): Observable<Object> {
    return this.httpClient.get(IsiteHttp.concat('fetchmaterials'));
  }

  public saveProjectDPRData(request: MaterialInwardsStructure, isAdd: boolean) : Observable<Object> {
    if(isAdd) {
      return this.httpClient.post(IsiteHttp.concat('addmaterial'), request);
    } else {
      return this.httpClient.post(IsiteHttp.concat('updatematerial'), request);
    }
  }

  public processMaterialData(ProjectMaterialArray: MaterialInwardsStructure[]): MaterialInwardsStructure[] {
    ProjectMaterialArray.sort((a, b) => {
      let date1 = new Date(a.inward_date);
      let date2 = new Date(b.inward_date);
      if (date1 > date2) {
        return -1;
      }
      if (date1 < date2) {
        return 1;
      }
      return 0;
    });

    /* let tempArray = [];
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
    tempMap.set(lastDate, tempArray); */

    /* let tempMap = new Map<Date, Materials>();
    ProjectMaterialArray.forEach((item) => {
      tempMap.set(new Date(item.inward_date), item.materials);
    }); */

    return ProjectMaterialArray;
  }
}
