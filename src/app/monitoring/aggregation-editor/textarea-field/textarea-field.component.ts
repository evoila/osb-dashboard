import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'textarea-field',
  templateUrl: './textarea-field.component.html'
})
export class TextareaFieldComponent implements OnChanges {
  @Input() field: any;
  @Input() aggs: any;
  @Input() aggregationType: any;
  @Output('result') resultEmitter = new EventEmitter();

  public textarea = {
    value: ''
  }

  constructor() {
  }

  public ngOnChanges(changes: any) {
    if (changes.aggs) { this.initialize(); }
  }

  private initialize() {
    if (this.aggs[this.aggregationType.type] === null) { this.aggs[this.aggregationType.type] = {}; }

    if (this.field.name === 'script') {
      this.handleScriptField();
    } else {
      this.handleNormalField();
    }
  }

  private handleNormalField() {
    if (this.aggs[this.aggregationType.type][this.field.name]) {
      this.textarea.value = this.aggs[this.aggregationType.type][this.field.name];
    }
  }

  private handleScriptField() {
    if (this.aggs[this.aggregationType.type][this.field.name]) {
      this.textarea.value = this.aggs[this.aggregationType.type][this.field.name]['inline'];
    }
  }

  updateField($event: any): boolean {
    const fieldName = this.field.name;
    const aggrType = this.aggregationType.type;
    if (!$event && this.aggs[aggrType][fieldName]) {
      delete this.aggs[aggrType][fieldName];
      this.resultEmitter.next(this.aggs);
      return true;
    }

    if (!this.aggs[aggrType][fieldName]) { this.aggs[aggrType][fieldName] = {}; }

    if (fieldName === 'script') {
      this.aggs[aggrType][fieldName]['inline'] = $event;
    } else {
      this.aggs[aggrType][fieldName] = $event;
    }
    this.resultEmitter.next(this.aggs);
  }
}
