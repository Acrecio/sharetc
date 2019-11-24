import { TestBed } from '@angular/core/testing';

import { PeerRtcService } from './peer-rtc.service';

describe('PeerRtcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeerRtcService = TestBed.get(PeerRtcService);
    expect(service).toBeTruthy();
  });
});
