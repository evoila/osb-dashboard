import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupPlanListComponent } from './backup-plan-list.component';

describe('BackupPlanListComponent', () => {
  let component: BackupPlanListComponent;
  let fixture: ComponentFixture<BackupPlanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupPlanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
