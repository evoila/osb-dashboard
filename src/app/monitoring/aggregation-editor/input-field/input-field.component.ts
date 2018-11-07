import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'input-field',
  templateUrl: './input-field.component.html'
})
export class InputFieldComponent {
  @Input() field: any;
  @Input() aggs: any;
  @Input() aggregationType: any;

  constructor() {}

  ngOnInit() {
    if (this.aggs[this.aggregationType.type] == null)
      this.aggs[this.aggregationType.type] = {};
  }

  updateField($event : any) : void {
    if (this.aggs[this.aggregationType.type][this.field.name].length == 0)
      delete this.aggs[this.aggregationType.type][this.field.name];
  }
}
