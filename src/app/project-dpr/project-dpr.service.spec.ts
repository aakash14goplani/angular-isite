import { TestBed } from '@angular/core/testing';

import { ProjectDprService } from './project-dpr.service';

describe('ProjectDprService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectDprService = TestBed.get(ProjectDprService);
    expect(service).toBeTruthy();
  });
});
