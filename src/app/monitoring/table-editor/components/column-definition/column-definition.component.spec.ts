import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnDefinitionComponent } from './column-definition.component';

describe('ColumnDefinitionComponent', () => {
  let component: ColumnDefinitionComponent;
  let fixture: ComponentFixture<ColumnDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
