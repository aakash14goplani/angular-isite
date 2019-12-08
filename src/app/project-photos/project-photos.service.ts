import { Injectable } from '@angular/core';

@Injectable()
export class ProjectPhotosService {

  constructor() { }

  private projectPhotosDataStore: Array<PhotosDataFormat> = [
    {
      title: 'Photos Title 1',
      description: 'Description 1',
      date: new Date(),
      url: 'https://www.queenstownisite.com/isite/queenstown/isite.svg',
      location: 'drain'
    },
    {
      title: 'Photos Title 2',
      description: 'Description 2',
      date: new Date('2019-8-23'),
      url: 'https://www.queenstownisite.com/isite/queenstown/isite.svg',
      location: 'bridge'
    },
    {
      title: 'Photos Title 3',
      description: 'Description 3',
      date: new Date(),
      url: 'https://www.queenstownisite.com/isite/queenstown/isite.svg',
      location: 'bridge'
    },
    {
      title: 'Photos Title 4',
      description: 'Description 4',
      date: new Date('2017-4-20'),
      url: 'https://www.queenstownisite.com/isite/queenstown/isite.svg',
      location: 'carriageway'
    },
    {
      title: 'Photos Title 5',
      description: 'Description 5',
      date: new Date('2019-01-01'),
      url: 'https://www.queenstownisite.com/isite/queenstown/isite.svg',
      location: 'drain'
    },
    {
      title: 'Photos Title 6',
      description: 'Description 6',
      date: new Date(),
      url: 'https://www.queenstownisite.com/isite/queenstown/isite.svg',
      location: 'carriageway'
    },
    {
      title: 'Photos Title 7',
      description: 'Description 7',
      date: new Date('2014-5-15'),
      url: 'https://www.queenstownisite.com/isite/queenstown/isite.svg',
      location: 'drain'
    }
  ];

  public getPhotosDetails(): Array<PhotosDataFormat> {
    return this.projectPhotosDataStore.slice();
  }
}

export interface PhotosDataFormat {
  title: string;
  description: string;
  date: Date;
  url: string;
  location: string
}
