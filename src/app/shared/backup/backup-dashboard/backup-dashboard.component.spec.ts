import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupDashboardComponent } from './backup-dashboard.component';

describe('BackupDashboardComponent', () => {
  let component: BackupDashboardComponent;
  let fixture: ComponentFixture<BackupDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
