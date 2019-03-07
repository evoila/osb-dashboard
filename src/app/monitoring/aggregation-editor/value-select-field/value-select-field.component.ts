import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'value-select-field',
  templateUrl: './value-select-field.component.html'
})
export class ValueSelectFieldComponent {
  @Input() field: any;
  @Input() additionalData: any;

  constructor() {
  }

  ngOnInit() {
  }
}
