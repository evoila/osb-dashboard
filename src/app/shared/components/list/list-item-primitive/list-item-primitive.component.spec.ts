import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemPrimitiveComponent } from './list-item-primitive.component';

describe('ListItemPrimitiveComponent', () => {
  let component: ListItemPrimitiveComponent;
  let fixture: ComponentFixture<ListItemPrimitiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemPrimitiveComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemPrimitiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
