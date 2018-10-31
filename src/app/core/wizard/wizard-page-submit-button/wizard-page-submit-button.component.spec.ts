import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardPageSubmitButtonComponent } from './wizard-page-submit-button.component';

describe('WizardPageSubmitButtonComponent', () => {
  let component: WizardPageSubmitButtonComponent;
  let fixture: ComponentFixture<WizardPageSubmitButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardPageSubmitButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardPageSubmitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
