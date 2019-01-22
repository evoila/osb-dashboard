import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePointListComponent } from './restore-point-list.component';

describe('RestorePointListComponent', () => {
  let component: RestorePointListComponent;
  let fixture: ComponentFixture<RestorePointListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestorePointListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
