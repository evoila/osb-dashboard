import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ranges-field',
  templateUrl: './ranges-field.component.html'
})
export class RangesFieldComponent implements OnInit {
  @Input() field: any;
  @Input() subField: any;
  @Input() aggs: any;
  @Input() aggregationType: any;
  @Input() index: number;
  @Input() subFieldName: string;
  @Output('result') resultEmitter = new EventEmitter();
  public fromValue: number;
  public toValue: number;

  constructor() { }

  ngOnInit() {
    if (this.aggs[this.aggregationType.type] == null) {
      this.aggs[this.aggregationType.type] = {};
    }

    if (this.aggs[this.aggregationType.type][this.field.name] && this.aggs[this.aggregationType.type][this.field.name][this.index]) {
      this.fromValue = this.aggs[this.aggregationType.type][this.field.name][this.index]['from'];
      this.toValue = this.aggs[this.aggregationType.type][this.field.name][this.index]['to'];
    }
  }

  updateFrom($event: any, index: number): void {
    this.checkField();
    this.aggs[this.aggregationType.type][this.field.name][index]['from'] = $event.target.value;
    this.cleanup();
  }

  updateTo($event: any, index: number): void {
    this.checkField();
    this.aggs[this.aggregationType.type][this.field.name][index]['to'] = $event.target.value;
    this.cleanup();
    this.resultEmitter.next(this.aggs);
  }

  public removeRange(index: number): void {
    this.aggs[this.aggregationType.type][this.field.name].splice(index, 1);
    this.field.subFields.splice(index, 1);
  }

  private checkField(): void {
    if (this.aggs[this.aggregationType.type][this.field.name] == null) {
      this.aggs[this.aggregationType.type][this.field.name] = [];
    }

    if (this.aggs[this.aggregationType.type][this.field.name][this.index] == null) {
      this.aggs[this.aggregationType.type][this.field.name][this.index] = {};
    }
  }

  private cleanup(): void {
    if ((this.aggs[this.aggregationType.type][this.field.name][this.index]['from'] == null ||
      this.aggs[this.aggregationType.type][this.field.name][this.index]['from'].length === 0) &&
      (this.aggs[this.aggregationType.type][this.field.name][this.index]['to'] == null ||
        this.aggs[this.aggregationType.type][this.field.name][this.index]['to'].length === 0)) {
      delete this.aggs[this.aggregationType.type][this.field.name][this.index];
    }
  }

}
