import { FetchPlanDetailsResponse } from './../services/response/fetchPlanDetails';
import { GenericResponse } from './../services/response/GenericResponse';
import { PlanDetailsDataStore, FileDetails } from './../services/request/createPlanDetailsRequest';
import { Component, OnInit } from '@angular/core';
import { ProjectPlanService } from './project-plan.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { IsiteHttp } from './../api-config';

@Component({
  selector: 'app-project-plan',
  templateUrl: './project-plan.component.html',
  styleUrls: ['./project-plan.component.css'],
  providers: [ ProjectPlanService ]
})
export class ProjectPlanComponent implements OnInit {

  constructor(
    private projectPlanService: ProjectPlanService, private modalService: NgbModal
  ) { }

  projectPlanDetails: PlanDetailsDataStore[] = [];

  isSorting: boolean = false;
  sortType: string = '';
  sortField: string = '';
  fileNames: string[] = [];
  fileObjects = [];
  filterValue: string = '';
  isFiltering: boolean = false;
  formData: FormGroup;
  updateFormData: FormGroup;
  tempUpdateData: PlanDetailsDataStore;

  ngOnInit() {
    this.projectPlanService.fetchPlanDetails().subscribe((data: FetchPlanDetailsResponse) => {
      if(data.message === "Success") {
        this.projectPlanDetails = data.content;
        this.projectPlanService.setProjectDetails(data.content);
      }
    });
  }

  get f(){
    return this.formData.controls;
  }

  openFile(url: string) : void {
    let fileUrl = IsiteHttp.concat("download/").concat(url);
    let fileModal = document.getElementById("fileBody");
    let childElem = fileModal.firstChild;
    if(childElem) {
      fileModal.removeChild(fileModal.firstChild);
    }
    let embedElement = document.createElement("embed");
    embedElement.setAttribute("src", fileUrl);
    embedElement.setAttribute("type", "application/pdf");
    embedElement.setAttribute("width", "100%");
    embedElement.setAttribute("height", "500px");
    fileModal.appendChild(embedElement);
  }

  deleteFile(projectDetails: PlanDetailsDataStore, fileName: string): void {
    let JsonObject = JSON.stringify(projectDetails);
    let requestBody: PlanDetailsDataStore = JSON.parse(JsonObject);
    if(requestBody && requestBody.files && requestBody.files.length > 0) {
      for(let index = requestBody.files.length-1; index >= 0; index--) {
        if(fileName === requestBody.files[index].fileName) {
          requestBody.removeFile = requestBody.files[index];
          requestBody.files.splice(index,1);
          break;
        }
      }
      this.projectPlanService.removeFile(requestBody).subscribe((data: GenericResponse) => {
        if(data.message === "Success") {
          this.projectPlanService.addProjectDetails(requestBody, false);
          this.projectPlanDetails = this.projectPlanService.getProjectPlanDetails();
        }
      });
    }

  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      for(let index=0; index < event.target.files.length; index++) {
        this.fileNames.push(event.target.files[index].name);
        let file = event.target.files[index];
        this.fileObjects.push(file);
      }
    }
  }

  addNewPlan(plan) {
    this.fileNames = [];
    this.fileObjects = [];
    this.formData = new FormGroup({
      name: new FormControl(null, Validators.required),
      file: new FormControl('', Validators.required),
      location: new FormControl(null, Validators.required)
    });
    this.modalService.open(plan);
  }

  addDrawings(updatePlan, projectDetails: PlanDetailsDataStore) {
    this.fileNames = [];
    this.fileObjects = [];
    this.updateFormData = new FormGroup({
      file: new FormControl('', Validators.required),
    });
    this.tempUpdateData = projectDetails;
    this.modalService.open(updatePlan);
  }

  sort(type: string, field: string): void {
    this.isSorting = true;
    this.sortType = type;
    this.sortField = field;
  }

  filter(filterValue: string): void {
    this.filterValue = filterValue;
    this.isFiltering = true;
  }

  clearFilter(): void {
    this.isFiltering = false;
    this.filterValue = '';
  }

  updatePlan() {
    console.log("In progress");
    const projectDetails = this.tempUpdateData;
    const formData = new FormData();
    const formDate: Date = new Date();
    const final_date = formDate.getUTCFullYear() + '-' + (formDate.getMonth() + 1)  + '-' + formDate.getDate();
    const planFiles: FileDetails[] = projectDetails.files? projectDetails.files: [];
    this.fileNames.forEach((file) => {
      let fileObj: FileDetails = {
        fileName: file,
        parentName: projectDetails.name,
        url: 'files/'.concat(projectDetails.name).concat('/').concat(file),
      }
      planFiles.push(fileObj);
    });
    const requestBody: PlanDetailsDataStore= {
      name: projectDetails.name,
      location: projectDetails.location,
      files: planFiles,
      date: final_date
    }
    formData.append('body', JSON.stringify(requestBody));
    this.fileObjects.forEach((file, index) => {
      formData.append('index', file);
    });
    this.projectPlanService.updateProjectDetails(formData).subscribe((data: GenericResponse) => {
      if(data.message == "Success") {
        // do rest logic here
        this.projectPlanService.addProjectDetails(requestBody, false);
        this.projectPlanDetails = this.projectPlanService.getProjectPlanDetails();
        this.modalService.dismissAll('Cross Clicked');
      }
    })
  }

  savePlan() {
    const formData = new FormData();
    const fileDetails: FileDetails[] = [];
    const formDate: Date = new Date();
    const final_date = formDate.getUTCFullYear() + '-' + (formDate.getMonth() + 1)  + '-' + formDate.getDate();
    this.fileNames.forEach((file) => {
      let fileObj: FileDetails = {
        fileName: file,
        parentName: this.formData.get('name').value,
        url: 'files/'.concat(this.formData.get('name').value).concat('/').concat(file),
      }
      fileDetails.push(fileObj);
    });
    const requestBody: PlanDetailsDataStore= {
      name: this.formData.get('name').value,
      location: this.formData.get('location').value,
      files: fileDetails,
      date: final_date
    }
    formData.append('body', JSON.stringify(requestBody));
    this.fileObjects.forEach((file, index) => {
      formData.append('index', file);
    });
    this.projectPlanService.savePlanDetails(formData).subscribe((data: GenericResponse) => {
      if(data.message == "Success") {
        // do rest logic here
        this.projectPlanService.addProjectDetails(requestBody, true);
        this.projectPlanDetails = this.projectPlanService.getProjectPlanDetails();
        this.modalService.dismissAll('Cross Clicked');
      }
    })
  }
}
