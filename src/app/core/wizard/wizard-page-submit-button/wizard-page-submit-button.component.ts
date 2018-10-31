import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'sb-wizard-page-submit-button',
  templateUrl: './wizard-page-submit-button.component.html',
  styleUrls: ['./wizard-page-submit-button.component.scss']
})
export class WizardPageSubmitButtonComponent implements OnInit {

  constructor(private readonly element: ElementRef) { }

  ngOnInit() {
  }

  public click() {
    const buttons: HTMLCollection = this.element.nativeElement.getElementsByTagName('button');
    const buttonsArray = [].slice.call(buttons); // http://stackoverflow.com/a/222847/125407
    const submitButtons = buttonsArray.filter(x => x.type === 'submit');
    submitButtons[0].click();
  }
}
