import { Injectable } from '@angular/core';

@Injectable()
export class ProjectTeamsService {

  constructor() { }

  private teamsDatStorage: Array<TeamsDataFormat> = [
    { image: 'https://www.queenstownisite.com/isite/queenstown/isite.svg', name: 'Ashish', description: 'Thinker',
      socialLinks: [
        { socialSite: 'LinkedIn', socialLink: '<url_1>' }
      ]
    },
    { image: 'https://www.queenstownisite.com/isite/queenstown/isite.svg', name: 'Sumit', description: 'Cloud',
      socialLinks: [
        { socialSite: 'LinkedIn', socialLink: '<url_1>' },
        { socialSite: 'Twitter', socialLink: '<url_2>' }
      ]
    },
    { image: 'https://www.queenstownisite.com/isite/queenstown/isite.svg', name: 'Aakash', description: 'Full Stack',
      socialLinks: [
        { socialSite: 'LinkedIn', socialLink: '<url_1>' },
        { socialSite: 'Twitter', socialLink: '<url_2>' },
        { socialSite: 'Stack Overflow', socialLink: '<url_3>' }
      ]
    }
  ];

  public getTeamsDetails(): TeamsDataFormat[] {
    return this.teamsDatStorage.slice();
  }
}

export interface TeamsDataFormat {
  image: string;
  name: string;
  description: string;
  socialLinks: Array<{ socialSite: string, socialLink: string }>;
}
