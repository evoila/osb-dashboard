import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'input-field',
  templateUrl: './input-field.component.html'
})
export class InputFieldComponent {
  @Input() field: any;
  @Input() aggs: any;
  @Input() aggregationType: any;
  @Output('result') resultEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (this.aggs[this.aggregationType.type] == null)
      this.aggs[this.aggregationType.type] = {};
  }

  updateField($event: any): void {
    this.aggs = { ...this.aggs, [this.aggregationType.type]: { ...this.aggs[this.aggregationType.type], [this.field.name]: $event } }
    if (this.aggs[this.aggregationType.type][this.field.name].length == 0)
      delete this.aggs[this.aggregationType.type][this.field.name];
    this.resultEmitter.next(this.aggs);
  }
}
