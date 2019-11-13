import { Component, OnInit } from '@angular/core';
import { ProjectDetailsService } from './project-details.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  providers: [ ProjectDetailsService ]
})
export class ProjectDetailsComponent implements OnInit {

  constructor(
    private projectDetailsService: ProjectDetailsService
  ) { }

  private projectDetails: Array<{name: string, date: Date}>;

  ngOnInit() {
    this.projectDetails = this.projectDetailsService.projectDetails();
  }

}
