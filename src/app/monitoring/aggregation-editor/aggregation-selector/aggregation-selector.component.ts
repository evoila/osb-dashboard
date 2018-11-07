import { Component, OnInit, Input } from '@angular/core';
import { ChartingUtilsService } from '../charting-utils.service';



const expertMode = true;

@Component({
  selector: 'aggregation-selector',
  templateUrl: './aggregation-selector.component.html',
  styleUrls: ['./aggregation-selector.component.css']
})
export class AggregationSelectorComponent implements OnInit {
  @Input() index: number;
  @Input() aggs: any;
  @Input() displayType: string;
  @Input() aggregationTypes: any;
  @Input() additionalData: any;
  private AGGS_KEY = 'aggs';
  public aggregationType: any = {};
  public aggType: string;
  public idx: string;

  constructor(readonly chartingUtils: ChartingUtilsService) {}

  ngOnInit() {
    this.idx = this.index.toString();
    if (this.aggs && this.aggs[this.AGGS_KEY] && this.aggs[this.AGGS_KEY][this.idx]) {
      const type = this.getFirstElement(this.aggs[this.AGGS_KEY][this.idx]);
      if (type) {
        this.aggregationType = this.aggregationTypes
          .filter((aggregationType: any) => {
            return aggregationType.type === type;
          })[0];
        this.aggType = this.aggregationType.type;
        this.restoreSubfields();
      }
    }
  }

  restoreSubfields() {
    this.aggregationType.fields.forEach(field => {

      if (!this.aggs[this.AGGS_KEY][this.idx][this.aggregationType.type] ||
          !this.aggs[this.AGGS_KEY][this.idx][this.aggregationType.type][field.name] ||
          !this.aggs[this.AGGS_KEY][this.idx][this.aggregationType.type][field.name].length) {
            return false;
          }

        if (field.subFields) {
          const fieldObjToMultiply = field.subFields.find(subfieldObj => subfieldObj.type === field.name);
          this.aggs[this.AGGS_KEY][this.idx][this.aggregationType.type][field.name].forEach((subFieldObj, index) => {
            if (index === 0) { // first item already displayed
              return false;
            }
            field.subFields.push(fieldObjToMultiply);
          });
        }
    });
  }

  public getFirstElement(aggregation: any) {
    let aggregation_type: string;
    if (aggregation) {
      Object.keys(aggregation).forEach(aggregation => {
        if (aggregation !== this.AGGS_KEY) {
          aggregation_type = aggregation;
        }
      });
    }
    return aggregation_type;
  }

  public prepareSubAggregation(): void {
    this.idx = this.index.toString();
    this.aggs[this.AGGS_KEY] = {};
    this.aggs[this.AGGS_KEY][this.idx] = {};
  }

  public initAggregationTree($event: any): void {
    this.aggregationType = this.aggregationTypes
      .filter((el: any) => { return el.type === $event.target.value; })[0];
    this.prepareSubAggregation();
  }

  public expertModeOn(fieldExpertMode: boolean): boolean {
    if (!expertMode && (fieldExpertMode == null || fieldExpertMode === false)) {
      return false;
    } else if (!expertMode && (fieldExpertMode != null && fieldExpertMode === true)) {
      return true;
    } else if (expertMode) {
      return false;
    }
    return false;
  }

  public clone(field: any): any {
    const clonedElem = this.chartingUtils.cloneObj(field.subFields[field.subFields.length - 1]);
    field.subFields.push(clonedElem);
  }

  debug(obj: any) { return JSON.stringify(obj); }

}
