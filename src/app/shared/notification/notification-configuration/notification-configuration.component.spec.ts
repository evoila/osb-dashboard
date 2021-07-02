import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationConfigurationComponent } from './notification-configuration.component';

describe('NotificationConfigurationComponent', () => {
  let component: NotificationConfigurationComponent;
  let fixture: ComponentFixture<NotificationConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
