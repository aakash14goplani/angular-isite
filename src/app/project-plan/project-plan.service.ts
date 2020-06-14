import { IsiteHttp } from './../api-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PlanDetailsDataStore, FileDetails} from '../services/request/createPlanDetailsRequest';

@Injectable()
export class ProjectPlanService {

  constructor(private httpClient: HttpClient) { }

  private projectPlanDataStote: Array<PlanDetailsDataStore> = [
    /* { name: 'MNB', contents: 14, location: 'drain', date: new Date('2017-8-23') },
    { name: 'MNB 2', contents: 15, location: 'drain', date: new Date('2017-9-23') },
    { name: 'MNB 3', contents: 16, location: 'drain', date: new Date('2017-1-23') },
    { name: 'MNB 4', contents: 17, location: 'drain', date: new Date('2017-3-23') },
    { name: 'MJB', contents: 12, location: 'bridge', date: new Date() },
    { name: 'MJB 2', contents: 13, location: 'bridge', date: new Date('2018-3-15') },
    { name: 'MJB 3', contents: 10, location: 'bridge', date: new Date('2019-7-12') },
    { name: 'Carriageway', contents: 5, location: 'carriageway', date: new Date('2028-8-23') },
    { name: 'Carriageway 2', contents: 6, location: 'carriageway', date: new Date('2020-8-23') }, */
  ];

  public getProjectPlanDetails(): Array<PlanDetailsDataStore> {
    return this.projectPlanDataStote.slice();
  }

  public savePlanDetails(formData: FormData): Observable<Object> {
    return this.httpClient.post(IsiteHttp.concat('uploadplandetails'), formData);
  }

  public fetchPlanDetails(): Observable<Object> {
    return this.httpClient.get(IsiteHttp.concat('fetchplandetails'));
  }

  public setProjectDetails(data: Array<PlanDetailsDataStore>): void {
    this.projectPlanDataStote = data;
  }

  public updateProjectDetails(data: FormData): Observable<Object> {
    return this.httpClient.post(IsiteHttp.concat('updateplandetails'), data);
  }

  public removeFile(requestBody: PlanDetailsDataStore): Observable<Object> {
    return this.httpClient.post(IsiteHttp.concat('removeplanfile'), requestBody);
  }

  public removeProjectDetails(projectName: string) {
    for(let index= this.projectPlanDataStote.length-1; index>=0; index--) {
      if(projectName === this.projectPlanDataStote[index].name) {
        this.projectPlanDataStote.splice(index,1);
        break;
      }
    }
  }

  public addProjectDetails(projectDetail: PlanDetailsDataStore, isNew: boolean) {
    if(isNew) {
      this.projectPlanDataStote.push(projectDetail);
    } else {
      for(let index=0; index < this.projectPlanDataStote.length; index++) {
        if(projectDetail.name == this.projectPlanDataStote[index].name) {
          this.projectPlanDataStote[index] = projectDetail;
          break;
        }
      }
    }
  }
}
