import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemRouterlinkComponent } from './list-item-routerlink.component';

describe('ListItemRouterlinkComponent', () => {
  let component: ListItemRouterlinkComponent;
  let fixture: ComponentFixture<ListItemRouterlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemRouterlinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemRouterlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
