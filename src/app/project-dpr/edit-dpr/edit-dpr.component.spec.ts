import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDprComponent } from './edit-dpr.component';

describe('EditDprComponent', () => {
  let component: EditDprComponent;
  let fixture: ComponentFixture<EditDprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
