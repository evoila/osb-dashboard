import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppidComponent } from './appid.component';

describe('AppidComponent', () => {
  let component: AppidComponent;
  let fixture: ComponentFixture<AppidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
