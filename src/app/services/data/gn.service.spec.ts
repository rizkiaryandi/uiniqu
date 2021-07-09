import { TestBed } from '@angular/core/testing';

import { GnService } from './gn.service';

describe('GnService', () => {
  let service: GnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
