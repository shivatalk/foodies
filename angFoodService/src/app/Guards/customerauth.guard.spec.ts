import { TestBed, async, inject } from '@angular/core/testing';

import { CustomerauthGuard } from './customerauth.guard';

describe('CustomerauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerauthGuard]
    });
  });

  it('should ...', inject([CustomerauthGuard], (guard: CustomerauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
