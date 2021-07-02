import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBackupPlanOverviewComponent } from './notification-backup-plan-overview.component';

describe('NotificationBackupPlanOverviewComponent', () => {
  let component: NotificationBackupPlanOverviewComponent;
  let fixture: ComponentFixture<NotificationBackupPlanOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationBackupPlanOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationBackupPlanOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
