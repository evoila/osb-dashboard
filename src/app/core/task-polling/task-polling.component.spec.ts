import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPollingComponent } from './task-polling.component';

describe('TaskPollingComponent', () => {
  let component: TaskPollingComponent;
  let fixture: ComponentFixture<TaskPollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskPollingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
