import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemButtonComponent } from './list-item-button.component';

describe('ListItemButtonComponent', () => {
  let component: ListItemButtonComponent;
  let fixture: ComponentFixture<ListItemButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
