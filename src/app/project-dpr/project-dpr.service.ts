import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IsiteHttp } from '../api-config';
import {FetchDprResponse, Content} from '../services/response/fetchDprResponse';
import { CreateDprRequest } from './../services/request/createDprRequest';

@Injectable()
export class ProjectDprService {
  
  constructor(private httpClient: HttpClient) { }

  private projectDPRDataStore: Array<Content> = [
    /* { date: '2019-7-10', content: ['Concreting PCC for swd at ch 23575 to 23607 RHS',
    'Concreting swd slab at ch 24198 to 24227 RHS',
    'Concreting swd slab at ch 24198 to 24227 RHS'
    ]},
    { date: '2019-7-11', content: ['Concreting swd wall at ch 24410 to 2442, 24764 to 24775 RHS and 24373 LHS',
    'Concreting swd wall at ch 24421 to 24432 RHS and 24530 to 24539 LHS '
    ]},
    { date: '2019-7-12', content: ['Concreting for Encasing HP culvert 1st lift ch 18860 LHS',
    'Soling for HP culvert at ch 24955'
    ]},
    { date: '2019-7-9', content: ['Embankment grading and watering at ch 24750 to 24950.',
    'Concreting PCC for utility duct at ch 19260'
    ]},
    { date: '2019-7-8', content: ['Dressing excavated bed for HP culvert at ch 25060','Dressing excavated swd slab'] },
    { date: '2019-6-8', content: ['Dressing excavated bed for HP culvert at ch 25060'] } */
  ];

  public isUpdateMode = new Subject<boolean>();
  public isAddMode = new Subject<boolean>();
  public dprDataChange = new Subject<Map<Date, string[]>>();

  public getProjectDPRData(): Array<Content> {
    return this.projectDPRDataStore.slice();
  }

  public setProjectDPRData(array: Content[]): void {
    this.projectDPRDataStore = array;
  }

  public addProjectDPRData(data: Content): void {
    this.projectDPRDataStore.push(data);
  }

  public saveProjectDPRData(data: Content, isAdd: boolean) : Observable<Object> {
    let dprRequest: CreateDprRequest = {
      date: data.date,
      content: data.content 
    };
    if(isAdd) {
      return this.httpClient.post(IsiteHttp.concat('savereport'), dprRequest);
    } else {
      return this.httpClient.post(IsiteHttp.concat('updatereport'), dprRequest);
    }
  }

  public getProcessedProjectDPRData(): Observable<Object> {
    //return this.processProjectDPRData(this.projectDPRDataStore.slice());
    return this.httpClient.get(IsiteHttp.concat('fetchdpr'));
  }

  public processProjectDPRData(projectDPRArray: Array<Content>): Map<Date, string[]> {
    console.log(JSON.stringify(projectDPRArray)); 
    projectDPRArray.sort((a, b) => {
      let date1 = new Date(a.date);
      let date2 = new Date(b.date);
      if (date1 > date2) {
        return -1;
      }
      if (date1 < date2) {
        return 1;
      }
      return 0;
    });

    /* let tempArray = [];
    let tempMap = new Map<Date, string[]>();
    let currentDate: Date = null;
    let nextDate: Date = null;
    let lastDate: Date = null;

    for (let i = 0; i < projectDPRArray.length - 1; i++) {
      currentDate = new Date(projectDPRArray[i].date);
      nextDate = new Date(projectDPRArray[i+1].date);
      
      tempArray.push(projectDPRArray[i].content);

      if (currentDate.getTime() !== nextDate.getTime()) {
        tempMap.set(currentDate, tempArray);
        tempArray = [];
      }

      lastDate = nextDate;
    }

    tempArray.push(projectDPRArray[projectDPRArray.length - 1].content);
    tempMap.set(lastDate, tempArray); */
    let tempMap = new Map<Date, string[]>();
    projectDPRArray.forEach((item) => {
      tempMap.set(new Date(item.date),item.content);
    });
    
    return tempMap;
  }
}
