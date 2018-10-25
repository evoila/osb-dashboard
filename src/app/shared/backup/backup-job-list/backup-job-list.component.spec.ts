import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupJobListComponent } from './backup-job-list.component';

describe('BackupJobListComponent', () => {
  let component: BackupJobListComponent;
  let fixture: ComponentFixture<BackupJobListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupJobListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
