import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDprComponent } from './project-dpr.component';

describe('ProjectDprComponent', () => {
  let component: ProjectDprComponent;
  let fixture: ComponentFixture<ProjectDprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
