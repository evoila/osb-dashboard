import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveLogsComponent } from './live-logs.component';

describe('LiveLogsComponent', () => {
  let component: LiveLogsComponent;
  let fixture: ComponentFixture<LiveLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
