import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglechartComponent } from './singlechart.component';

describe('SinglechartComponent', () => {
  let component: SinglechartComponent;
  let fixture: ComponentFixture<SinglechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
