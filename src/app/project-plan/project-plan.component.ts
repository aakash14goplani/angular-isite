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

  private projectPlanDetails: Array<{ name: string, contents: number }> = [];

  ngOnInit() {
    this.projectPlanDetails = this.projectPlanService.getProjectPlanDetails();
  }

}
