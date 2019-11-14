import { TestBed } from '@angular/core/testing';

import { ProjectMaterialInwardService } from './project-material-inward.service';

describe('ProjectMaterialInwardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectMaterialInwardService = TestBed.get(ProjectMaterialInwardService);
    expect(service).toBeTruthy();
  });
});
