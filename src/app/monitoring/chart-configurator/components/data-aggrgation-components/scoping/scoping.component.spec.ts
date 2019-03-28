import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopingComponent } from './scoping.component';

describe('ScopingComponent', () => {
  let component: ScopingComponent;
  let fixture: ComponentFixture<ScopingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScopingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
