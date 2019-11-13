import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterNSortComponent } from './filter-n-sort.component';

describe('FilterNSortComponent', () => {
  let component: FilterNSortComponent;
  let fixture: ComponentFixture<FilterNSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterNSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterNSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
