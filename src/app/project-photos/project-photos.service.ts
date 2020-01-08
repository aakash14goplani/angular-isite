import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ProjectPhotosService {

  constructor() { }

  // private http: HttpClient = new HttpClient(new HttpHandler());

  private projectPhotosDataStore: Array<PhotosDataFormat> = [
    {
      title: 'Photos Title 1',
      description: 'Description 1',
      date: new Date(),
      url: 'assets/images/bridge_1.jpg',
      location: 'bridge'
    },
    {
      title: 'Photos Title 2',
      description: 'Description 2',
      date: new Date('2019-8-23'),
      url: 'assets/images/bridge_2.jpg',
      location: 'bridge'
    },
    {
      title: 'Photos Title 3',
      description: 'Description 3',
      date: new Date(),
      url: 'assets/images/bridge_3.jpg',
      location: 'bridge'
    },
    {
      title: 'Photos Title 4',
      description: 'Description 4',
      date: new Date('2019-1-23'),
      url: 'assets/images/bridge_4.jpg',
      location: 'bridge'
    },
    {
      title: 'Photos Title 5',
      description: 'Description 5',
      date: new Date(),
      url: 'assets/images/bridge_5.jpg',
      location: 'bridge'
    },
    {
      title: 'Photos Title 6',
      description: 'Description 6',
      date: new Date('2017-4-20'),
      url: 'assets/images/carriageway_2.jpeg',
      location: 'carriageway'
    },
    {
      title: 'Photos Title 7',
      description: 'Description 7',
      date: new Date('2019-01-01'),
      url: 'assets/images/drain_2.jpeg',
      location: 'drain'
    },
    {
      title: 'Photos Title 8',
      description: 'Description 8',
      date: new Date(),
      url: 'assets/images/carriageway_3.jpeg',
      location: 'carriageway'
    },
    {
      title: 'Photos Title 9',
      description: 'Description 9',
      date: new Date('2014-5-15'),
      url: 'assets/images/drain_1.jpeg',
      location: 'drain'
    },
    {
      title: 'Photos Title 10',
      description: 'Description 10',
      date: new Date('2020-5-15'),
      url: 'assets/images/carriageway_4.jpeg',
      location: 'carriageway'
    },
    {
      title: 'Photos Title 11',
      description: 'Description 11',
      date: new Date('2020-5-15'),
      url: 'assets/images/carriageway_5.jpeg',
      location: 'carriageway'
    },
    {
      title: 'Photos Title 12',
      description: 'Description 12',
      date: new Date('2020-01-01'),
      url: 'assets/images/drain_3.jpeg',
      location: 'drain'
    }
  ];

  public getPhotosDetails(): Array<PhotosDataFormat> {
    return this.projectPhotosDataStore.slice();
  }

  /* https://stackoverflow.com/questions/40214772/file-upload-in-angular
  public postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'app/';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http
      .post(endpoint, formData)
      .pipe(
        map(() => { return true; }),
        catchError(this.handleError)
    );
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    console.log('errorResponse: ', errorResponse);
    console.log('errorResponse.erroe: ', errorResponse.error);
    return throwError('An unknown error occured!');
  } */
}

export interface PhotosDataFormat {
  title: string;
  description: string;
  date: Date;
  url: string;
  location: string
}
