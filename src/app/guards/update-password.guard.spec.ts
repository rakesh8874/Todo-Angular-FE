import { TestBed } from '@angular/core/testing';

import { UpdatePasswordGuard } from './update-password.guard';

describe('UpdatePasswordGuard', () => {
  let guard: UpdatePasswordGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UpdatePasswordGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
