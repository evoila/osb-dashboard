import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAggregationComponent } from './data-aggregation.component';

describe('DataAggregationComponent', () => {
  let component: DataAggregationComponent;
  let fixture: ComponentFixture<DataAggregationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAggregationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAggregationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
