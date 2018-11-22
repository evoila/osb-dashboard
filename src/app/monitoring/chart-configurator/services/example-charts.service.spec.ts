import { TestBed } from '@angular/core/testing';

import { ExampleChartsService } from './example-charts.service';

describe('ExampleChartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExampleChartsService = TestBed.get(ExampleChartsService);
    expect(service).toBeTruthy();
  });
});
