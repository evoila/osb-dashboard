import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtpConfigurationComponent } from './smtp-configuration.component';

describe('SmtpConfigurationComponent', () => {
  let component: SmtpConfigurationComponent;
  let fixture: ComponentFixture<SmtpConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmtpConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmtpConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
