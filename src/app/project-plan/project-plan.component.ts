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

  private projectPlanDetails: Array<{ name: string, contents: number, location: string, date: Date }> = [];

  private isSorting: boolean = false;
  private sortType: string = '';
  private sortField: string = '';

  private filterValue: string = '';
  private isFiltering: boolean = false;

  ngOnInit() {
    this.projectPlanDetails = this.projectPlanService.getProjectPlanDetails();
  }

  private sort(type: string, field: string): void {
    this.isSorting = true;
    this.sortType = type;
    this.sortField = field;
  }

  private filter(filterValue: string): void {
    this.filterValue = filterValue;
    this.isFiltering = true;
  }

  private clearFilter(): void {
    this.isFiltering = false;
    this.filterValue = '';
  }

}
