import { TestBed } from '@angular/core/testing';

import { ProjectDetailsResolverService } from './project-details-resolver.service';

describe('ProjectDetailsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectDetailsResolverService = TestBed.get(ProjectDetailsResolverService);
    expect(service).toBeTruthy();
  });
});
