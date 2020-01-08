import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectPhotosService, PhotosDataFormat } from './project-photos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-photos',
  templateUrl: './project-photos.component.html',
  styleUrls: ['./project-photos.component.css'],
  providers: [ ProjectPhotosService ]
})
export class ProjectPhotosComponent implements OnInit, OnDestroy {

  constructor(
    private projectPhotosService: ProjectPhotosService
  ) { }

  photosArray: Array<PhotosDataFormat>;
  // private arrayOfArrays: Array<PhotosDataFormat[]>;

  isSorting: boolean = false;
  sortType: string = '';
  sortField: string = '';
  fileToUpload: File = null;

  filterValue: string = '';
  isFiltering: boolean = false;

  private tempSubscription: Subscription;

  ngOnInit() {
    this.photosArray = this.projectPhotosService.getPhotosDetails();

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

  ngOnDestroy(): void {
    // this.tempSubscription.unsubscribe();
  }

}
