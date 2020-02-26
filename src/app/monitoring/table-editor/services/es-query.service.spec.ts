import { TestBed, inject } from '@angular/core/testing';

import { ESQueryService } from './es-query.service';

describe('ESQueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ESQueryService]
    });
  });

  it('should be created', inject([ESQueryService], (service: ESQueryService) => {
    expect(service).toBeTruthy();
  }));
});
