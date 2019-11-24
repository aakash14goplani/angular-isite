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

  ngOnInit() {
    this.photosArray = this.projectPhotosService.getPhotosDetails();

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
        this.arrayOfArrays[counter - 1].push({ title: '', description: '', date: new Date(), url: '' });
      }
    }
  }

}
