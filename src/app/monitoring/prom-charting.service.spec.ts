import { TestBed, inject } from '@angular/core/testing';

import { PromChartingService } from './prom-charting.service';

describe('PromChartingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromChartingService]
    });
  });

  it('should be created', inject([PromChartingService], (service: PromChartingService) => {
    expect(service).toBeTruthy();
  }));
});
