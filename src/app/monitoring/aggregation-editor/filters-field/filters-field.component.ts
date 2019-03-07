import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'filters-field',
  templateUrl: './filters-field.component.html'
})
export class FiltersFieldComponent {
  @Input() field: any;
  @Input() subField: any;
  @Input() aggs: any;
  @Input() aggregationType: any;
  @Input() index: number;
  @Input() subFieldName: string;
  @Output('result') resultEmitter = new EventEmitter();
  public subFieldValue: string;

  constructor() { }

  ngOnInit() {
    if (this.aggs[this.aggregationType.type] == null)
      this.aggs[this.aggregationType.type] = {};
  }

  updateField($event: any, index: number): void {
    if (this.aggs[this.aggregationType.type][this.field.name] == null)
      this.aggs[this.aggregationType.type][this.field.name] = {};

    this.aggs[this.aggregationType.type][this.field.name][index] = {
      'term': {}
    };
    this.aggs[this.aggregationType.type][this.field.name][index]['term'][this.subFieldName] = $event.target.value;

    if (this.subFieldName == null || this.subFieldName.length == 0)
      delete this.aggs[this.aggregationType.type][this.field.name][index];

    this.resultEmitter.next(this.aggs);
  }


}
