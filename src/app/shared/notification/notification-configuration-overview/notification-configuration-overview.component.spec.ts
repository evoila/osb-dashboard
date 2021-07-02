import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationConfigurationOverviewComponent } from './notification-configuration-overview.component';

describe('NotificationConfigurationOverviewComponent', () => {
  let component: NotificationConfigurationOverviewComponent;
  let fixture: ComponentFixture<NotificationConfigurationOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationConfigurationOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationConfigurationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
