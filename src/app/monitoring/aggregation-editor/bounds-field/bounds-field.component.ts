import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bounds-field',
  templateUrl: './bounds-field.component.html'
})
export class BoundsFieldComponent {
  @Input() field: any;
  @Input() subField: any;
  @Input() aggs: any;
  @Input() aggregationType: any;
  @Input() index: number;
  @Input() minValue: number;
  @Input() maxValue: number;

  constructor() {
  }

  ngOnInit() {
    this.aggs[this.aggregationType.type] = {};
  }

  updateMin($event : any) : void {
    this.checkField();
    this.aggs[this.aggregationType.type][this.field.name]["min"] = $event.target.value;
    this.cleanup();
  }

  updateMax($event : any) : void {
    this.checkField();
    this.aggs[this.aggregationType.type][this.field.name]["max"] = $event.target.value;
    this.cleanup();
  }

  private checkField() : void {
    if (this.aggs[this.aggregationType.type][this.field.name] == null)
      this.aggs[this.aggregationType.type][this.field.name] = {};
  }

  private cleanup() : void {
    if ((this.aggs[this.aggregationType.type][this.field.name]["min"] == null ||
      this.aggs[this.aggregationType.type][this.field.name]["min"].length == 0) &&
      (this.aggs[this.aggregationType.type][this.field.name]["max"] == null ||
        this.aggs[this.aggregationType.type][this.field.name]["max"].length == 0))
      delete this.aggs[this.aggregationType.type][this.field.name];
  }
}
