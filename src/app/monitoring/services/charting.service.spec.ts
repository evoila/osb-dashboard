import { TestBed, inject } from '@angular/core/testing';

import { ChartingService } from './charting.service';

describe('ChartingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartingService]
    });
  });

  it('should be created', inject([ChartingService], (service: ChartingService) => {
    expect(service).toBeTruthy();
  }));
});