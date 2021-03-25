import { TestBed } from '@angular/core/testing';

import { HttpGetParamsService } from './http-get-params.service';

describe('HttpGetParamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpGetParamsService = TestBed.get(HttpGetParamsService);
    expect(service).toBeTruthy();
  });
});
