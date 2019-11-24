import { Injectable } from '@angular/core';

@Injectable()
export class ProjectMaterialInwardService {

  constructor() { }

  private materialsDataStore: Array<MaterialInwardsStructure> = [
    { inward_date: new Date(), materials: [
        { name: 'Concrete', quantity: 20 },
        { name: 'Steel', quantity: 10 }
      ]
    },
    { inward_date: new Date(), materials: [
        { name: 'Fly Ash', quantity: 30 }
      ]
    },
    { inward_date: new Date(), materials: [
        { name: 'Concrete', quantity: 20 },
        { name: 'Steel', quantity: 10 },
        { name: 'Fly Ash', quantity: 30 }
      ]
    }
  ];

  public getMaterials(): Array<MaterialInwardsStructure> {
    return this.materialsDataStore.slice();
  }
}

export interface MaterialInwardsStructure {
  inward_date: Date;
  materials: Array<{ name: string, quantity: number }>;
}
