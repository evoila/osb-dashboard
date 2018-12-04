import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCreateComponent } from './manage-create.component';

describe('ManageCreateComponent', () => {
  let component: ManageCreateComponent;
  let fixture: ComponentFixture<ManageCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
