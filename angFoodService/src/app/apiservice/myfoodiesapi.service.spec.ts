import { TestBed } from '@angular/core/testing';

import { MyfoodiesapiService } from './myfoodiesapi.service';

describe('MyfoodiesapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyfoodiesapiService = TestBed.get(MyfoodiesapiService);
    expect(service).toBeTruthy();
  });
});
