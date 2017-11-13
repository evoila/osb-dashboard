import { TestBed, inject } from '@angular/core/testing';

import { LBaasService } from './lbaas.service';

describe('LbaasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LBaasService]
    });
  });

  it('should be created', inject([LBaasService], (service: LBaasService) => {
    expect(service).toBeTruthy();
  }));
});
