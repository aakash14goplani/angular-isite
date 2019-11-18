import { Injectable } from '@angular/core';

@Injectable()
export class ProjectDprService {

  constructor() { }

  private projectDPRLaboursDataStore: Array<{type: string, content: number}> = [
    { type: 'Male', content: 1 },
    { type: 'Female', content: 2 },
    { type: 'NW', content: 3 }
  ];

  private projectDPRMachineryDataStore: Array<{type: string, content: number}> = [
    { type: 'Poclain', content: 1 },
    { type: 'Dumper', content: 2 },
    { type: 'JCB', content: 3 }
  ];

  private projectDPRMaterialDataStore: Array<{type: string, content: number}> = [
    { type: 'Murum', content: 1 },
    { type: 'RMC M20', content: 2 }
  ];

  private projectDPRActivitiesDataStore: Array<{type: string}> = [
    { type: 'Earthwork filing' },
    { type: 'Rock breaking' },
    { type: 'SWD Wall' }
  ];

  public getLaboursDetails(): Array<{type: string, content: number}> {
    return this.projectDPRLaboursDataStore.slice();
  }

  public getMachineryDetails(): Array<{type: string, content: number}> {
    return this.projectDPRMachineryDataStore.slice();
  }

  public getMaterialDetails(): Array<{type: string, content: number}> {
    return this.projectDPRMaterialDataStore.slice();
  }

  public getActivitiesDetails(): Array<{type: string}> {
    return this.projectDPRActivitiesDataStore.slice();
  }
}
