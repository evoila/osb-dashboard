import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'input-field',
  templateUrl: './input-field.component.html'
})
export class InputFieldComponent implements OnInit, OnDestroy {
  @Input() field: any;
  @Input('aggs') set setAggs(aggs: any) {
    this.aggs = aggs
  }
  @Input() aggregationType: any;
  @Output('result') resultEmitter = new EventEmitter();

  aggs: any;
  constructor() { }

  ngOnInit() {
    if (this.aggs[this.aggregationType.type] == null)
      this.aggs[this.aggregationType.type] = {};
  }
  ngOnDestroy() {
    console.log("destroyed");
  }

  updateField($event: any): void {
    this.aggs = { ...this.aggs, [this.aggregationType.type]: { ...this.aggs[this.aggregationType.type], [this.field.name]: $event } }
    if (this.aggs[this.aggregationType.type][this.field.name].length == 0)
      delete this.aggs[this.aggregationType.type][this.field.name];
    this.resultEmitter.next(this.aggs);
  }
}
