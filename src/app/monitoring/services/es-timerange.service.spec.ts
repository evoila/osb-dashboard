import { TestBed, inject } from '@angular/core/testing';

import { EsTimerangeService } from './es-timerange.service';

describe('EsTimerangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsTimerangeService]
    });
  });

  it('should be created', inject([EsTimerangeService], (service: EsTimerangeService) => {
    expect(service).toBeTruthy();
  }));
});
