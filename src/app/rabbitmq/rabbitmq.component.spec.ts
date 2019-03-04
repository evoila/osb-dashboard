import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RabbitMQComponent } from './rabbitmq.component';

describe('RabbitMQComponent', () => {
  let component: RabbitMQComponent;
  let fixture: ComponentFixture<RabbitMQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RabbitMQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RabbitMQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
