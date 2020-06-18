import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseQueryInputComponent } from './base-query-input.component';

describe('BaseQueryInputComponent', () => {
  let component: BaseQueryInputComponent;
  let fixture: ComponentFixture<BaseQueryInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseQueryInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseQueryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
