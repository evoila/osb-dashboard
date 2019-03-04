import { TestBed, inject } from '@angular/core/testing';

import { RabbitMQService } from './rabbitmq.service';

describe('RabbitMQService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RabbitMQService]
    });
  });

  it('should be created', inject([RabbitMQService], (service: RabbitMQService) => {
    expect(service).toBeTruthy();
  }));
});
