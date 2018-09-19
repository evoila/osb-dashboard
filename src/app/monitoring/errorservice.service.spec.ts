import { TestBed, inject } from '@angular/core/testing';

import { ErrorserviceService } from './errorservice.service';

describe('ErrorserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorserviceService]
    });
  });

  it('should be created', inject([ErrorserviceService], (service: ErrorserviceService) => {
    expect(service).toBeTruthy();
  }));
});
