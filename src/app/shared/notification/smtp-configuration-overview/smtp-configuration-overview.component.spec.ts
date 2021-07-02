import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtpConfigurationOverviewComponent } from './smtp-configuration-overview.component';

describe('SmtpConfigurationOverviewComponent', () => {
  let component: SmtpConfigurationOverviewComponent;
  let fixture: ComponentFixture<SmtpConfigurationOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmtpConfigurationOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmtpConfigurationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
