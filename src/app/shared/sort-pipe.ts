import { PipeTransform, Pipe } from '@angular/core';

import { ProjectBgDetailsService } from '../project-bg-details/project-bg-details.service';
import { ProjectDetailsService } from '../project-details/project-details.service';
import { ProjectPlanService } from '../project-plan/project-plan.service';
import { ProjectPhotosService } from '../project-photos/project-photos.service';
import { ProjectDprService } from '../project-dpr/project-dpr.service';
import { ProjectMaterialInwardService } from '../project-material-inward/project-material-inward.service';
import { ProjectFilesService } from '../project-files/project-files.service';
import { ProjectTeamsService } from '../project-teams/project-teams.service';

@Pipe({
    name: 'sortData'
})
export class SortDataPipe implements PipeTransform {

    transform(value: any, sortOrder: string, sortField: string, fromService: string) {

        let service: any;
        sortOrder = (sortOrder == null) ? 'asc' : sortOrder;

        if (fromService && sortField) {
           /*  switch (fromService) {
                case 'details': service = new ProjectDetailsService(); break;
                case 'plan': service = new ProjectPlanService(); break;
                case 'photos': service = new ProjectPhotosService(); break;
                case 'dpr': service = new ProjectDprService(); break;
                case 'materials': service = new ProjectMaterialInwardService(); break;
                case 'files': service = new ProjectFilesService(); break;
                case 'teams': service = new ProjectTeamsService(); break;
                case 'bg_details': service = new ProjectBgDetailsService(); break;
                default: break;
            } */

            if (value && value.length > 0) {
                value.sort((a, b) => {
                    let compare: number = 0;
                    if (a[sortField] instanceof Date) {
                        if ((new Date(a[sortField]) as any) > (new Date(b[sortField]) as any)) {
                            compare = (sortOrder === 'asc') ? 1 : -1;
                        }
                        if ((new Date(a[sortField]) as any) < (new Date(b[sortField]) as any)) {
                            compare = (sortOrder === 'asc') ? -1 : 1;
                        }
                    }
                    if (typeof a[sortField] === 'string') {
                        if (a[sortField].toLowerCase() > b[sortField].toLowerCase()) {
                            compare = (sortOrder === 'asc') ? 1 : -1;
                        }
                        if (a[sortField].toLowerCase() < b[sortField].toLowerCase()) {
                            compare = (sortOrder === 'asc') ? -1 : 1;
                        }
                    }
                    return compare;
                });
            }
        }
        return value;
    }
}
