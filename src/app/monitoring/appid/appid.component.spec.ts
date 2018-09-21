import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SbAppidComponent } from './sb-appid.component';

describe('SbAppidComponent', () => {
  let component: SbAppidComponent;
  let fixture: ComponentFixture<SbAppidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SbAppidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SbAppidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
