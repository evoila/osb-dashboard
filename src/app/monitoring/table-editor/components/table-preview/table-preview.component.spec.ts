import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePreviewComponent } from './table-preview.component';

describe('TablePreviewComponent', () => {
  let component: TablePreviewComponent;
  let fixture: ComponentFixture<TablePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
