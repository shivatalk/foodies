import { TestBed, async, inject } from '@angular/core/testing';

import { VendorauthGuard } from './vendorauth.guard';

describe('VendorauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendorauthGuard]
    });
  });

  it('should ...', inject([VendorauthGuard], (guard: VendorauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
