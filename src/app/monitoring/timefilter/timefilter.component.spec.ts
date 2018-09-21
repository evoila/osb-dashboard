import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimefilterComponent } from './timefilter.component';

describe('TimefilterComponent', () => {
  let component: TimefilterComponent;
  let fixture: ComponentFixture<TimefilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimefilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
