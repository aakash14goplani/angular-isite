import { TestBed } from '@angular/core/testing';

import { ProjectPhotosService } from './project-photos.service';

describe('ProjectPhotosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectPhotosService = TestBed.get(ProjectPhotosService);
    expect(service).toBeTruthy();
  });
});
