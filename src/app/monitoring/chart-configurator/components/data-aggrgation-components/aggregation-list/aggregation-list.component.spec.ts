import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregationListComponent } from './aggregation-list.component';

describe('AggregationListComponent', () => {
  let component: AggregationListComponent;
  let fixture: ComponentFixture<AggregationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
