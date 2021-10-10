import { TestBed } from '@angular/core/testing';

import { RequestServerService } from './request-server.service';

describe('RequestServerService', () => {
  let service: RequestServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
