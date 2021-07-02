import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationConfigurationRecentOverviewComponent } from './notification-configuration-recent-overview.component';

describe('NotificationConfigurationRecentOverviewComponent', () => {
  let component: NotificationConfigurationRecentOverviewComponent;
  let fixture: ComponentFixture<NotificationConfigurationRecentOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationConfigurationRecentOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationConfigurationRecentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
