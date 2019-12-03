import { Component, OnInit } from '@angular/core';
import { ProjectDetailsService } from './project-details.service';
import { ProjectService } from '../project/project.service';
import { Router, ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  /* providers: [ ProjectDetailsService ] - provide at root level to support route-resolver */
})
export class ProjectDetailsComponent implements OnInit {

  constructor(
    // private projectDetailsService: ProjectDetailsService,
    private coreProjectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  private projectDetails: Array<{name: string, date: Date}>;

  ngOnInit() {
    // this.projectDetails = this.projectDetailsService.projectDetails();
    this.route.data.subscribe((data: Data) => {
      // console.log('data: ', data, ', typeof data: ', typeof data, ', is array? ', data instanceof Array);
      this.projectDetails = data[0];
    });
  }

  private storeProjectName(projectName: string): void {
    this.coreProjectService.globalProjectName.next(projectName);
    this.router.navigate(['../plan'], { relativeTo: this.route });
  }

}
