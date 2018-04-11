import { TestBed, inject } from '@angular/core/testing';

import { EschartsService } from './escharts.service';

describe('EschartsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EschartsService]
    });
  });

  it('should be created', inject([EschartsService], (service: EschartsService) => {
    expect(service).toBeTruthy();
  }));
});
