import { TestBed } from '@angular/core/testing';

import { CustomEndpointService } from './custom-endpoint.service';

describe('CustomEndpointServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomEndpointService = TestBed.get(CustomEndpointService);
    expect(service).toBeTruthy();
  });
});
