import { Component, OnInit } from '@angular/core';
import { ProjectPlanService } from './project-plan.service';

@Component({
  selector: 'app-project-plan',
  templateUrl: './project-plan.component.html',
  styleUrls: ['./project-plan.component.css'],
  providers: [ ProjectPlanService ]
})
export class ProjectPlanComponent implements OnInit {

  constructor(
    private projectPlanService: ProjectPlanService
  ) { }

  projectPlanDetails: Array<{ name: string, contents: number, location: string, date: Date }> = [];

  isSorting: boolean = false;
  sortType: string = '';
  sortField: string = '';

  filterValue: string = '';
  isFiltering: boolean = false;

  ngOnInit() {
    this.projectPlanDetails = this.projectPlanService.getProjectPlanDetails();
  }

  sort(type: string, field: string): void {
    this.isSorting = true;
    this.sortType = type;
    this.sortField = field;
  }

  filter(filterValue: string): void {
    this.filterValue = filterValue;
    this.isFiltering = true;
  }

  clearFilter(): void {
    this.isFiltering = false;
    this.filterValue = '';
  }

}
