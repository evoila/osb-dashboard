import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'params-field',
  templateUrl: './params-field.component.html'
})
export class ParamsFieldComponent {
  @Input() field: any;
  @Input() subField: any;
  @Input() aggs: any;
  @Input() aggregationType: any;
  @Input() index: number;
  @Input() subFieldName: string;
  @Output('result') resultEmitter = new EventEmitter();
  public subFieldValue: string;

  constructor() {
  }

  ngOnInit() {
    if (this.aggs[this.aggregationType.type] == null)
      this.aggs[this.aggregationType.type] = {};
  }

  updateFieldName($event: any): void {
    this.aggs[this.aggregationType.type][this.field.name] = {};
    this.aggs[this.aggregationType.type][this.field.name][$event.target.value] = {};
    this.resultEmitter.next(this.aggs);
  }

  updateField($event: any): void {
    this.aggs[this.aggregationType.type][this.field.name][this.subFieldName] = $event.target.value;

    if (this.aggs[this.aggregationType.type][this.field.name].length == 0)
      delete this.aggs[this.aggregationType.type][this.field.name];

    this.resultEmitter.next(this.aggs);
  }

}
