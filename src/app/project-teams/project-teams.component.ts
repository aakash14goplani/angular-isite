import { Component, OnInit } from '@angular/core';
import { ProjectTeamsService, TeamsDataFormat } from './project-teams.service';

@Component({
  selector: 'app-project-teams',
  templateUrl: './project-teams.component.html',
  styleUrls: ['./project-teams.component.css'],
  providers: [ ProjectTeamsService ]
})
export class ProjectTeamsComponent implements OnInit {

  constructor(
    private projectTeamsService: ProjectTeamsService
  ) { }

  teamsData: TeamsDataFormat[];

  ngOnInit() {
    this.teamsData = this.projectTeamsService.getTeamsDetails();
  }

}
