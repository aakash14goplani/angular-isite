import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBgDetailsComponent } from './project-bg-details.component';

describe('ProjectBgDetailsComponent', () => {
  let component: ProjectBgDetailsComponent;
  let fixture: ComponentFixture<ProjectBgDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBgDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBgDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
