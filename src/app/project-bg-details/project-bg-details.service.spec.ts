import { TestBed } from '@angular/core/testing';

import { ProjectBgDetailsService } from './project-bg-details.service';

describe('ProjectBgDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectBgDetailsService = TestBed.get(ProjectBgDetailsService);
    expect(service).toBeTruthy();
  });
});
