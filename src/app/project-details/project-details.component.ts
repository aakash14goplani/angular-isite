import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectDetailsService } from './project-details.service';
import { ProjectService } from '../project/project.service';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  /* providers: [ ProjectDetailsService ] - provide at root level to support route-resolver */
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private projectDetailsService: ProjectDetailsService,
    private coreProjectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  private projectDetails: Array<{name: string, date: Date}>;
  private addProject: boolean = false;

  private additionSubscription: Subscription;
  private dataSubscription: Subscription;

  ngOnInit() {
    // this.projectDetails = this.projectDetailsService.projectDetails();
    this.route.data.subscribe((data: Data) => {
      // console.log('data: ', data, ', typeof data: ', typeof data, ', is array? ', data instanceof Array);
      this.projectDetails = data[0];
    });
    this.dataSubscription = this.projectDetailsService.dataChanged.subscribe((data: Array<{ name: string, date: Date }>) => {
      this.projectDetails = data;
    });

    this.addProject = false;
    this.additionSubscription = this.projectDetailsService.additionMode.subscribe((status: boolean) => {
      this.addProject = status;
    });
  }

  private storeProjectName(projectName: string): void {
    this.coreProjectService.globalProjectName.next(projectName);
    this.router.navigate(['../plan'], { relativeTo: this.route });
  }

  private addNewProject(): void {
    this.addProject = true;
  }

  private deleteProject(index: number): void {
    this.projectDetailsService.deleteProjectDetails(index);
    console.log(index);
  }

  ngOnDestroy(): void {
    this.additionSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
  }

}
