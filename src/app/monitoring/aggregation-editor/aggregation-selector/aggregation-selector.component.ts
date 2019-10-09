import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ChartingUtilsService } from '../charting-utils.service';
import { Observable } from 'rxjs';



const expertMode = true;

@Component({
  selector: 'aggregation-selector',
  templateUrl: './aggregation-selector.component.html',
  styleUrls: ['./aggregation-selector.component.css']
})
export class AggregationSelectorComponent implements OnInit, OnDestroy {
  @Input() index: number;
  @Input('aggs') set setAggs(aggs: any) {

    this.aggs = aggs;
  }
  @Input() displayType: string;
  @Input() aggregationTypes: any;
  @Input() additionalData: any;

  aggs: any;
  // Emits updated data on every Change
  @Output('aggs') aggregationEventEmitter = new EventEmitter();

  private AGGS_KEY = 'aggs';

  public aggregationType: any = {};
  public aggType: string;
  public idx: string;

  constructor(readonly chartingUtils: ChartingUtilsService) { }
  ngOnDestroy() {
    this.aggs = {};
    this.aggregationEventEmitter.next(this.aggs);
  }
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
    if (this.aggs)
      delete this.aggs[this.AGGS_KEY];
    this.aggs[this.AGGS_KEY] = {};
    this.aggs[this.AGGS_KEY][this.idx] = {};
  }
  // When the User selects a new AggregatiinType the old one should be delete
  // since this would lead to a faulty aggregation
  /* private resetAggregationKey() {
    delete this.aggs[this.AGGS_KEY];
  } */
  public initAggregationTree($event: any): void {
    /*if (Object.keys(this.aggregationType).length) {
      this.resetAggregationKey();
    }*/
    this.aggType = $event.target.value;
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

  public mergeResult(event: any) {
    this.aggs = { ...this.aggs, 'aggs': { [this.idx]: { ...this.aggs['aggs'][this.idx], ...event } } };
    this.aggregationEventEmitter.next(this.aggs);
  }

  public clone(field: any): any {
    const clonedElem = this.chartingUtils.cloneObj(field.subFields[field.subFields.length - 1]);
    field.subFields.push(clonedElem);
  }

  debug(obj: any) { return JSON.stringify(obj); }

}
