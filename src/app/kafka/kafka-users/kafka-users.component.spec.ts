import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KafkaUsersComponent } from './kafka-users.component';

describe('KafkaUsersComponent', () => {
  let component: KafkaUsersComponent;
  let fixture: ComponentFixture<KafkaUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KafkaUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KafkaUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
