import { Pipe, PipeTransform } from '@angular/core';

import { ProjectDetailsService } from '../project-details/project-details.service';
import { ProjectPlanService } from '../project-plan/project-plan.service';
import { ProjectPhotosService } from '../project-photos/project-photos.service';
import { ProjectDprService } from '../project-dpr/project-dpr.service';
import { ProjectMaterialInwardService } from '../project-material-inward/project-material-inward.service';
import { ProjectFilesService } from '../project-files/project-files.service';
import { ProjectTeamsService } from '../project-teams/project-teams.service';
import { ProjectBgDetailsService } from '../project-bg-details/project-bg-details.service';

@Pipe({
  name: 'filterData'
})
export class FilterDataPipe implements PipeTransform {

  transform(value: any, filterValue: string, filterField: string, fromService: string): any {

    console.log('Initial values received in FILTER - ');
    console.log('value: ', value);
    console.log('filterValue: ', filterValue);
    console.log('filterField: ', filterField);
    console.log('fromService: ', fromService);

    let service: any;

    if (fromService && filterField && filterValue) {
      switch (fromService) {
        case 'details': service = new ProjectDetailsService(); break;
        case 'plan': service = new ProjectPlanService(); break;
        case 'photos': service = new ProjectPhotosService(); break;
        case 'dpr': service = new ProjectDprService(); break;
        case 'materials': service = new ProjectMaterialInwardService(); break;
        case 'files': service = new ProjectFilesService(); break;
        case 'teams': service = new ProjectTeamsService(); break;
        case 'bg_details': service = new ProjectBgDetailsService(); break;
        default: break;
      }

      if (value && value.length > 0) {
        const tempArray = value.filter((data) => {
          return data[filterField] === filterValue.toLowerCase();
        });
        if (tempArray.length > 0) {
          console.log('returning filtered valus: ', tempArray);
          return tempArray;
        }
      }
    }
    console.log('returning original values from filter: ', value);
    return value;
  }

}
