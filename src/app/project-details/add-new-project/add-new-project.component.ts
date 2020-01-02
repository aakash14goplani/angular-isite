import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectDetailsService } from '../project-details.service';

@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.css']
})
export class AddNewProjectComponent implements OnInit {

  constructor(
    private projectDetailsService: ProjectDetailsService
  ) { }

  ngOnInit() {
  }

  saveProjectDetails(formData: NgForm): void {
    const projectName = formData.value.project_name;
    this.projectDetailsService.additionMode.next(false);
    this.projectDetailsService.addProjectDetails(projectName, new Date());
    formData.reset();
  }

  cancelAddition(): void {
    this.projectDetailsService.additionMode.next(false);
  }

}
