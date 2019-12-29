import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDprComponent } from './add-dpr.component';

describe('AddDprComponent', () => {
  let component: AddDprComponent;
  let fixture: ComponentFixture<AddDprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
