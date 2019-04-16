import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreLogsComponent } from './explore-logs.component';

describe('ExploreLogsComponent', () => {
  let component: ExploreLogsComponent;
  let fixture: ComponentFixture<ExploreLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
