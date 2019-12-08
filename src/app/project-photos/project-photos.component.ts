import { Component, OnInit } from '@angular/core';
import { ProjectPhotosService, PhotosDataFormat } from './project-photos.service';

@Component({
  selector: 'app-project-photos',
  templateUrl: './project-photos.component.html',
  styleUrls: ['./project-photos.component.css'],
  providers: [ ProjectPhotosService ]
})
export class ProjectPhotosComponent implements OnInit {

  constructor(
    private projectPhotosService: ProjectPhotosService
  ) { }

  private photosArray: Array<PhotosDataFormat>;
  private arrayOfArrays: Array<PhotosDataFormat[]>;

  private isSorting: boolean = false;
  private sortType: string = '';
  private sortField: string = '';

  private filterValue: string = '';
  private isFiltering: boolean = false;

  private temp: Array<number> = [1, 2, 3, 4, 5, 6, 7];

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

  private sort(type: string, field: string): void {
    this.isSorting = true;
    this.sortType = type;
    this.sortField = field;
  }

  private filter(filterValue: string): void {
    this.filterValue = filterValue;
    this.isFiltering = true;
  }

  private clearFilter(): void {
    this.isFiltering = false;
    this.filterValue = '';
  }

}
