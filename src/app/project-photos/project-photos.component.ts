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

  ngOnInit() {
    this.photosArray = this.projectPhotosService.getPhotosDetails();
  }

}
