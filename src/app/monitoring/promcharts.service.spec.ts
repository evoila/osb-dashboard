import { TestBed, inject } from '@angular/core/testing';

import { PromchartsService } from './promcharts.service';

describe('PromchartsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromchartsService]
    });
  });

  it('should be created', inject([PromchartsService], (service: PromchartsService) => {
    expect(service).toBeTruthy();
  }));
});
