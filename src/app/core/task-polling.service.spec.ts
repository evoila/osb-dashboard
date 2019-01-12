import { TestBed } from '@angular/core/testing';

import { TaskPollingService } from './task-polling.service';

describe('TaskPollingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskPollingService = TestBed.get(TaskPollingService);
    expect(service).toBeTruthy();
  });
});
