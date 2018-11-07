import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'order-field',
  templateUrl: './order-field.component.html'
})
export class OrderFieldComponent {
  @Input() field: any;
  @Input() subField: any;
  @Input() aggs: any;
  @Input() aggregationType: any;
  @Input() index: number;
  @Input() subFieldName: string;
  @Input() subFieldSortDirection: string;

  constructor() {}

  ngOnInit() {
    if (this.aggs[this.aggregationType.type] == null)
      this.aggs[this.aggregationType.type] = {};
  }

  updateField($event : any) : void {
    this.aggs[this.aggregationType.type][this.field.name] = {};
    this.aggs[this.aggregationType.type][this.field.name][this.subFieldName] = $event.target.value;

    if (this.subFieldName.length == 0)
      delete this.aggs[this.aggregationType.type][this.field.name];
  }


}
