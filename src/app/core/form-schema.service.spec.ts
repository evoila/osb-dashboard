import { TestBed } from '@angular/core/testing';

import { FormSchemaService } from './form-schema.service';

describe('FormSchemaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormSchemaService = TestBed.get(FormSchemaService);
    expect(service).toBeTruthy();
  });
});
