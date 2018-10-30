import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindingListComponent } from './binding-list.component';

describe('BindingListComponent', () => {
  let component: BindingListComponent;
  let fixture: ComponentFixture<BindingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
