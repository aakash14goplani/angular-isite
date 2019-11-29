import { Component, OnInit } from '@angular/core';
import { ProjectDetailsService } from './project-details.service';
import { ProjectService } from '../project/project.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  providers: [ ProjectDetailsService ]
})
export class ProjectDetailsComponent implements OnInit {

  constructor(
    private projectDetailsService: ProjectDetailsService,
    private coreProjectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  private projectDetails: Array<{name: string, date: Date}>;

  ngOnInit() {
    this.projectDetails = this.projectDetailsService.projectDetails();
  }

  private storeProjectName(projectName: string): void {
    this.coreProjectService.globalProjectName.next(projectName);
    this.router.navigate(['../plan'], { relativeTo: this.route });
  }

}
