import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnBuilderComponent } from './column-builder.component';

describe('ColumnBuilderComponent', () => {
  let component: ColumnBuilderComponent;
  let fixture: ComponentFixture<ColumnBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
