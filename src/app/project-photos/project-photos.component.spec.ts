import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPhotosComponent } from './project-photos.component';

describe('ProjectPhotosComponent', () => {
  let component: ProjectPhotosComponent;
  let fixture: ComponentFixture<ProjectPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
