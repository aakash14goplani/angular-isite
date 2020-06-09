import { GenericResponse } from './../services/response/GenericResponse';
import { FetchFileResponse, FileMap } from './../services/response/fetchFilesResponse';
import { Component, OnInit } from '@angular/core';
import { ProjectFilesService } from './project-files.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { IsiteHttp } from '../api-config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-files',
  templateUrl: './project-files.component.html',
  styleUrls: ['./project-files.component.css'],
  providers: [ ProjectFilesService ]
})
export class ProjectFilesComponent implements OnInit {
myForm = new FormGroup({
  file: new FormControl('', [Validators.required]),
  fileSource: new FormControl('', [Validators.required])
});
fileUrl: string;
displayFile: boolean;
fileNames: string[] = [];
fileObjects = [];
fileMap: Map<String, FetchFileResponse[]>;
uploadingFor: string = '';
isLoading: boolean = true;
  constructor(
    private projectFilesService: ProjectFilesService, private modalService: NgbModal
  ) { }

  // tslint:disable: no-inferrable-types
  ngOnInit() {
    this.projectFilesService.fetchFiles().subscribe((data: FileMap) => {
      if(data.message == "Success") {
        this.fileMap = this.projectFilesService.getProcessedFileDataStore(data.content);
        this.projectFilesService.setProjectDataStore(this.fileMap);
        this.isLoading = false;
      }
    });

  }

  get f(){
    return this.myForm.controls;
  }
     
  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      for(let index=0; index < event.target.files.length; index++) {
        this.fileNames.push(event.target.files[index].name);
        let file = event.target.files[index];
        this.myForm.patchValue({
          fileSource: file
        });
        this.fileObjects.push(file);
      }
    }
  }

  initiateUploadFor(option: string, fileUpload): void {
    this.uploadingFor = option;
    console.log('uploadingFor: ', this.uploadingFor);
    this.myForm = new FormGroup({
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });
    this.fileNames = [];
    this.modalService.open(fileUpload);
  }

  openFile(folder:string, fileName: string) : void {
    this.fileUrl = IsiteHttp.concat("download/files/").concat(folder).concat('/').concat(fileName);
    let fileModal = document.getElementById("fileBody");
    let childElem = fileModal.firstChild;
    if(childElem) {
      fileModal.removeChild(fileModal.firstChild);
    }
    let embedElement = document.createElement("embed");
    embedElement.setAttribute("src", this.fileUrl);
    embedElement.setAttribute("type", "application/pdf");
    embedElement.setAttribute("width", "100%");
    embedElement.setAttribute("height", "500px");
    fileModal.appendChild(embedElement);
  }

  deleteFile(folder:string, fileName: string) : void {
    this.fileUrl = IsiteHttp.concat("remove/files/").concat(folder).concat('/').concat(fileName);
    this.projectFilesService.deleteFile(this.fileUrl).subscribe((data: GenericResponse) => {
      if(data.message == "Success") {
        let fileData: FetchFileResponse = {
          parent_id: folder,
          parent_name: folder.replace("_", " "),
          file_name: fileName
        }
        this.projectFilesService.removeProjectStoreData(fileData);
        this.fileMap = this.projectFilesService.getProjectStoreData();
      }
    })
  }

  uploadFiles(): void {
    console.log('File Uploaded for: ', this.uploadingFor);
    let formData = new FormData();
    formData.append('field', this.uploadingFor);
    this.fileObjects.forEach((file, index) => {
      formData.append('index', file);
    });
    
    this.projectFilesService.uploadFiles(formData).subscribe((data: GenericResponse) => {
      if(data.message == "Success") {
        this.fileNames.forEach((file) => {
          let fileObj: FetchFileResponse = {
            parent_id: this.uploadingFor,
            parent_name: this.uploadingFor.replace("_", " "),
            file_name: file
          }
          this.projectFilesService.addProjectStoreData(fileObj);
        });
        this.fileMap = this.projectFilesService.getProjectStoreData();
        this.modalService.dismissAll('Cross Clicked');
      }
      console.log(data);
    })
  }

}
