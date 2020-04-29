// this component is used to wrap table.component and chart.component


import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementWrapperComponent } from './element-wrapper.component';

describe('ElementWrapperComponent', () => {
  let component: ElementWrapperComponent;
  let fixture: ComponentFixture<ElementWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
