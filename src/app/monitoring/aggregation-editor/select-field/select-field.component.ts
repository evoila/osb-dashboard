import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'select-field',
  templateUrl: './select-field.component.html'
})
export class SelectFieldComponent implements OnChanges {
  @Input() field: any;
  @Input() aggs: any;
  @Input() aggregationType: any;

  constructor() {
  }

   ngOnChanges(changes: any) {
    if (changes.aggs) { this.initialize(); }
  }

  private initialize(): void {
    if (!this.aggs[this.aggregationType.type]) {
      this.aggs[this.aggregationType.type] = {};
    }


    if (this.aggregationType.fields) {
      const selectField = this.aggregationType.fields.filter(element => element.name === 'field');
      if (selectField && selectField.length > 0) {
        this.field.options = this.field.options
          .filter(element =>
            selectField[0].applicableOn.indexOf(element.value.type) !== -1
          )
      }
    }
  }



  updateField($event: any): void {
    this.aggs[this.aggregationType.type][this.field.name] = $event.target.value;

    if (this.aggs[this.aggregationType.type][this.field.name] == null ||
      this.aggs[this.aggregationType.type][this.field.name].length === 0)
      delete this.aggs[this.aggregationType.type][this.field.name];
  }

}
