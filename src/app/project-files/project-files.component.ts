import { Component, OnInit } from '@angular/core';
import { ProjectFilesService } from './project-files.service';

@Component({
  selector: 'app-project-files',
  templateUrl: './project-files.component.html',
  styleUrls: ['./project-files.component.css'],
  providers: [ ProjectFilesService ]
})
export class ProjectFilesComponent implements OnInit {

  constructor(
    private projectFilesService: ProjectFilesService
  ) { }

  // tslint:disable: no-inferrable-types
  uploadingFor: string = '';

  ngOnInit() {
    /*
		  logic to upload files
		  this.projectFilesService.....
  	*/
  }

  initiateUploadFor(option: string): void {
    this.uploadingFor = option;
    console.log('uploadingFor: ', this.uploadingFor);
  }

  uploadFiles(): void {
    console.log('File Uploaded for: ', this.uploadingFor);
    /*
		logic to upload files
		this.projectFilesService.....
  	*/
  }

}
