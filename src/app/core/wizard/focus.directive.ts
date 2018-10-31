import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[sbFocus]'
})
export class FocusDirective {

  constructor(public readonly element: ElementRef) { }

}
