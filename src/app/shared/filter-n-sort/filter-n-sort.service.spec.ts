import { TestBed } from '@angular/core/testing';

import { FilterNSortService } from './filter-n-sort.service';

describe('FilterNSortService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterNSortService = TestBed.get(FilterNSortService);
    expect(service).toBeTruthy();
  });
});
