import { ElementRef, ContentChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FocusDirective } from '../focus.directive';
import { WizardPageSubmitButtonComponent } from '../wizard-page-submit-button/wizard-page-submit-button.component';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit
} from '@angular/core';

@Component({
  selector: 'sb-wizard-page',
  templateUrl: './wizard-page.component.html',
  styleUrls: ['./wizard-page.component.scss']
})
export class WizardPageComponent implements OnInit, AfterViewInit {
  @Input() active: boolean = false;
  @Input() id: string;
  @Input() isSkipped: boolean = false;
  @Input() public nextDisabled: boolean;
  @Input() public errorFlag: boolean;

  @Output() readonly onCommit: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() readonly onActivate: EventEmitter<any> = new EventEmitter(false);

  @ContentChild(FocusDirective) focusElement: FocusDirective;
  @ContentChild(NgForm) form: NgForm;

  @ContentChild(WizardPageSubmitButtonComponent) submitButton: WizardPageSubmitButtonComponent;

  constructor(public readonly element: ElementRef) {
  }

  ngOnInit() {
    this.onActivate.subscribe(() => {
      this.focusFirstElement();
    });
  }

  ngAfterViewInit() {
    if (!this.form) {
      throw new Error('WizardPageComponent must have a form ContentChild');
    }

    if (!this.submitButton) {
      throw new Error('WizardPageComponent must have exactly one submit button');
    }
  }

  private focusFirstElement() {
    // if we have an explicit focus element (marked using mstFocus directive), focus that
    if (this.focusElement) {
      this.focus(this.focusElement.element.nativeElement);
      return;
    }

    // focus first input field
    const inputs = this.element.nativeElement.getElementsByTagName('input');
    if (inputs.length) {
      this.focus(inputs[0]);
    }
  }

  private focus(element: any) {
    // need to wait for next loop iteration before setting focus (e.g. because )
    setTimeout(() => element.focus());
  }

  public submit() {
    // note: we can't use form.submit() here because that doesn't trigger the browser's own form validation (OTOH that may be desirable but for now we have it)
    // an additional benefit is that it allows us to ensure all pages have a form submit button, which is required for the current page<->wizard interaction
    this.submitButton.click();
  }
}
