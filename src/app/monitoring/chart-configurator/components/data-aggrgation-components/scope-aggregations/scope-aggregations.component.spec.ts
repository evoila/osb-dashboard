import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeAggregationsComponent } from './scope-aggregations.component';

describe('ScopeAggregationsComponent', () => {
  let component: ScopeAggregationsComponent;
  let fixture: ComponentFixture<ScopeAggregationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScopeAggregationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeAggregationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
