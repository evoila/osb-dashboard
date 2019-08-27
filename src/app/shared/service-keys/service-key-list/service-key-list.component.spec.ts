import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceKeyListComponent } from './service-key-list.component';

describe('ServiceKeyListComponent', () => {
  let component: ServiceKeyListComponent;
  let fixture: ComponentFixture<ServiceKeyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceKeyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceKeyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
