import { TestBed, inject } from '@angular/core/testing';

import { BindingService } from './binding.service';

describe('BindingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BindingService]
    });
  });

  it('should be created', inject([BindingService], (service: BindingService) => {
    expect(service).toBeTruthy();
  }));
});
