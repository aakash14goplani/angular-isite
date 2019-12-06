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

    let service: any;
    /* https://stackoverflow.com/questions/43698908/multiple-pipes-simultaneously-in-angular-2 */

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
        const tempArray = []; // make it dynamic
        for (const data of value) {
          if (data[filterField] === filterValue) {
            // make it dynamic
            tempArray.push({ name: data.name, contents: data.contents, location: data.location, date: data.date });
          }
        }
        if (tempArray.length > 0) {
          return tempArray;
        }
      }
    }
    return value;
  }

}
