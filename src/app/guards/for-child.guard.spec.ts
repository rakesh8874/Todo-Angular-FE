import { TestBed } from '@angular/core/testing';

import { ForChildGuard } from './for-child.guard';

describe('ForChildGuard', () => {
  let guard: ForChildGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ForChildGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
