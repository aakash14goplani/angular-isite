import { Component, OnInit } from '@angular/core';
import { ProjectDprService } from './project-dpr.service';

@Component({
  selector: 'app-project-dpr',
  templateUrl: './project-dpr.component.html',
  styleUrls: ['./project-dpr.component.css'],
  providers: [ ProjectDprService ]
})
export class ProjectDprComponent implements OnInit {

  constructor(
    private projectDPRService: ProjectDprService
  ) { }

  private laboursArray: Array<{type: string, content: number}>;
  private machineryArray: Array<{type: string, content: number}>;
  private materialArray: Array<{type: string, content: number}>;
  private activitiesArray: Array<{type: string}>;

  ngOnInit(): void {
    this.laboursArray = this.projectDPRService.getLaboursDetails();
    this.machineryArray = this.projectDPRService.getMachineryDetails();
    this.materialArray = this.projectDPRService.getMaterialDetails();
    this.activitiesArray = this.projectDPRService.getActivitiesDetails();
  }

}
