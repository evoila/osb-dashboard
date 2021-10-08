import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sbListItem]'
})
export class ListItemDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
