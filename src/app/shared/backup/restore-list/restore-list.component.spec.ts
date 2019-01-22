import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreListComponent } from './restore-list.component';

describe('RestoreListComponent', () => {
  let component: RestoreListComponent;
  let fixture: ComponentFixture<RestoreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestoreListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
