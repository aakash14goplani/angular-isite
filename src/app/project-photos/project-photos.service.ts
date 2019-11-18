import { Injectable } from '@angular/core';

@Injectable()
export class ProjectPhotosService {

  constructor() { }

  private projectPhotosDataStore: Array<{title: string, description: string, date: Date, url: string}> = [
    {
      title: 'Photos Title 1',
      description: 'Description 1',
      date: new Date(),
      url: 'https://www.queenstownisite.com/isite/queenstown/isite.svg'
    },
    {
      title: 'Photos Title 2',
      description: 'Description 2',
      date: new Date(),
      url: 'https://www.queenstownisite.com/isite/queenstown/isite.svg'
    },
    {
      title: 'Photos Title 3',
      description: 'Description 3',
      date: new Date(),
      url: 'https://www.queenstownisite.com/isite/queenstown/isite.svg'
    },
    {
      title: 'Photos Title 4',
      description: 'Description 4',
      date: new Date(),
      url: 'https://www.queenstownisite.com/isite/queenstown/isite.svg'
    },
    {
      title: 'Photos Title 5',
      description: 'Description 5',
      date: new Date(),
      url: 'https://www.queenstownisite.com/isite/queenstown/isite.svg'
    },
    {
      title: 'Photos Title 6',
      description: 'Description 6',
      date: new Date(),
      url: 'https://www.queenstownisite.com/isite/queenstown/isite.svg'
    }
  ];
}
