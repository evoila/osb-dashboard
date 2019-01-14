import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAggregationComponent } from './create-aggregation.component';

describe('CreateAggregationComponent', () => {
  let component: CreateAggregationComponent;
  let fixture: ComponentFixture<CreateAggregationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAggregationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAggregationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
