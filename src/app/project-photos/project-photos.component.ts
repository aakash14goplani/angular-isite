import { GenericResponse } from './../services/response/GenericResponse';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { IsiteHttp } from './../api-config';
import { FetchPhotosResponse } from './../services/response/fetchPhotosResponse';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectPhotosService } from './project-photos.service';
import { PhotosDataFormat} from '../services/response/fetchPhotosResponse'
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-project-photos',
  templateUrl: './project-photos.component.html',
  styleUrls: ['./project-photos.component.css'],
  providers: [ ProjectPhotosService ]
})
export class ProjectPhotosComponent implements OnInit, OnDestroy {

  constructor(
    private projectPhotosService: ProjectPhotosService, private modalService: NgbModal
  ) { }
  downloadUrl: string = IsiteHttp.concat('download/');
  photosArray: Array<PhotosDataFormat> =[];
  // private arrayOfArrays: Array<PhotosDataFormat[]>;
  date: Date = new Date();
  isSorting: boolean = false;
  sortType: string = '';
  sortField: string = '';
  fileToUpload: File = null;

  filterValue: string = '';
  isFiltering: boolean = false;
  formData: FormGroup;
  fileName: string;
  fileObject: any;

  private tempSubscription: Subscription;

  addNewPhoto(content) {
    this.formData = new FormGroup({
      date: new FormControl(Date, Validators.required),
      title: new FormControl(null, Validators.required),
      file: new FormControl('', Validators.required),
      location: new FormControl(null, Validators.required)
    });
    this.formData.controls['date'].setValue(new Date());
    this.modalService.open(content);
  }

  ngOnInit() {
    //this.formData.setValue({date: new Date()});
    this.projectPhotosService.fetchPhotos().subscribe((data: FetchPhotosResponse) => {
      if(data.message == "Success") {
        this.photosArray = data.content;
        this.projectPhotosService.setPhotoDetails(this.photosArray);
      }
    });

    /* procedure to use nested for loop
    this.arrayOfArrays = [];
    const size = 3;
    const emptyArrayContents = ((this.photosArray.length % size) > 0) ? (size - (this.photosArray.length % size)) : 0;
    let counter = 0;

    for (let i = 0; i < this.photosArray.length; i += size) {
      this.arrayOfArrays.push(this.photosArray.slice(i, i + size));
      counter++;
    }
    if (emptyArrayContents > 0) {
      for (let i = 0; i < emptyArrayContents; i++) {
        this.arrayOfArrays[counter - 1].push({ title: '', description: '', date: new Date(), url: '', location: '' });
      }
    } */
  };
  

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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    /* this.tempSubscription = this.projectPhotosService.postFile(this.fileToUpload).subscribe(
      (data: boolean) => {
        console.log('SUCCESS', data);
      },
      (error) => {
        console.log('ERROR', error);
      }
    ); */
    
  }

   onFileChange(event) {
  
    if (event.target.files.length > 0) {
      for(let index=0; index < event.target.files.length; index++) {
        let file = event.target.files[index];
        this.fileObject = file;
        this.fileName = file.name;
      }
    }
  }

  uploadPhoto() {
    const formDate: Date = this.formData.get('date').value;
    const final_date = formDate.getUTCFullYear() + '-' + (formDate.getMonth() + 1)  + '-' + formDate.getDate();
    const url = "files/".concat("photos").concat("/").concat(this.fileName);
    const formData = new FormData();
    formData.append("url", url);
    formData.append("date", final_date);
    formData.append("location", this.formData.get("location").value);
    formData.append("title", this.formData.get("title").value);
    formData.append("file", this.fileObject);

    this.projectPhotosService.uploadPhoto(formData).subscribe((data: GenericResponse) => {
      if(data.message == "Success") {
        const photoData: PhotosDataFormat = {
          url: url,
          date: final_date,
          location: this.formData.get("location").value,
          title: this.formData.get("title").value
        }
        this.projectPhotosService.addPhotoDetails(photoData);
        this.photosArray = this.projectPhotosService.getPhotosDetails();
        this.modalService.dismissAll('Cross clicked');
      }
    });
  }
  ngOnDestroy(): void {
    // this.tempSubscription.unsubscribe();
  }

}
