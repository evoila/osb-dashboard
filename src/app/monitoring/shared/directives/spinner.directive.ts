import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

/*
Directive that makes the mouse a spinner on a conditional
should be used on a wrapper div to indicate loading stuff
*/
@Directive({
  selector: '[sbSpinner]'
})
export class SpinnerDirective implements OnInit {
  // Input that declares boolean Value on which the Spinner should appear
  @Input('condition$')
  condition: Observable<boolean>;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.condition.subscribe(k => {
      this.el.nativeElement.style.cursor = k ? 'progress' : 'default';

    })
  }
}
