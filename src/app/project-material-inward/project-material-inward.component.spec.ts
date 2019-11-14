import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMaterialInwardComponent } from './project-material-inward.component';

describe('ProjectMaterialInwardComponent', () => {
  let component: ProjectMaterialInwardComponent;
  let fixture: ComponentFixture<ProjectMaterialInwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMaterialInwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMaterialInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
