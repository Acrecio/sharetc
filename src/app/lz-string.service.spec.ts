import { TestBed } from '@angular/core/testing';

import { LzStringService } from './lz-string.service';

describe('LzStringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LzStringService = TestBed.get(LzStringService);
    expect(service).toBeTruthy();
  });
});
