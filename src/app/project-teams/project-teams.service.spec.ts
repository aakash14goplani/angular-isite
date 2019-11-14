import { TestBed } from '@angular/core/testing';

import { ProjectTeamsService } from './project-teams.service';

describe('ProjectTeamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectTeamsService = TestBed.get(ProjectTeamsService);
    expect(service).toBeTruthy();
  });
});
