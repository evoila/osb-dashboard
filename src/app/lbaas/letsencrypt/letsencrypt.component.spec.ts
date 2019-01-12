import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetsencryptComponent } from './letsencrypt.component';

describe('LetsencryptComponent', () => {
  let component: LetsencryptComponent;
  let fixture: ComponentFixture<LetsencryptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetsencryptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetsencryptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
