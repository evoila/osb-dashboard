import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChartSidepanelComponent } from './add-chart-sidepanel.component';

describe('AddChartSidepanelComponent', () => {
  let component: AddChartSidepanelComponent;
  let fixture: ComponentFixture<AddChartSidepanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChartSidepanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChartSidepanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
