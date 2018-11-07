import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';


import { AggregationTemplateService } from '../aggregation-template.service';


import { Observable } from 'rxjs';
import { ChartingUtilsService } from '../charting-utils.service';
import { Field } from 'app/monitoring/aggregation-editor/model/field';


@Component({
  selector: 'aggregation-editor',
  templateUrl: './aggregation-editor.component.html',
  styleUrls: ['./aggregation-editor.component.css']
})
export class AggregationEditorComponent implements OnInit, OnChanges {
  @Output() result = new EventEmitter();
  @Input()
  public fields: Observable<Array<Field>>;
  @Input()
  public type: String;

  @Input() set aggregations(aggregations: any) {
    this.aggsAsText = aggregations[0].command;
    this.aggs = JSON.parse(aggregations[0].command) || {};
  }

  public aggregationTypes: Array<any> = new Array<any>();
  public displayTypes: Array<any>;
  public displayType: any = {};
  public availableSearchObjects: Array<string>;
  public request: any = {
    'stored_fields': ['*'],
    'index': ['*'],
    'body': null,
    'type': ''
  };
  public data = {
    searchObjectName: '',
    fieldToCount: 'value',
    fields: Array<Field>()
  };
  public aggs: any = {
    'aggs': {
      0: {
      }
    }
  };
  public useTextEditor: boolean = false;
  private aggsAsText: string


  constructor(private aggregationTemplateService: AggregationTemplateService,
    private chartingUtils: ChartingUtilsService) {
    this.loadDisplayTypes();
  }

  ngOnInit() {

    this.loadFields();
    this.setDisplayType(this.displayType.type);

    if (this.type) {
      this.displayType = {
        'type': this.type
      };
    }

    if (!this.data.searchObjectName) {
      this.displayType = {
        'type': ''
      };
    }
  }

  ngOnChanges(changes) {
    if (changes.aggregations && this.useTextEditor) {
      this.aggs = this.aggsAsText;
    }
  }

  public loadDisplayTypes() {
    this.displayTypes = this.chartingUtils.chartTypes();
  }

  public stringifyAggs() {
    if (this.useTextEditor) {
      this.aggs = this.aggsAsText
    } else {
      this.aggs = JSON.parse(this.aggsAsText);
    }
  }


  public loadFields() {
    this.fields.subscribe((fields: Array<Field>) => {
      this.data.fields = fields;
      this.aggregationTypes = this.aggregationTemplateService.getAggregationTypes(this.data.fields, 'line');
    });
  }

  public setDisplayType($event: any): boolean {
    const type = $event;
    if (this.data.fields.length === 0) {
      return false;
    }

    if (type) {
      this.aggregationTypes = this.aggregationTemplateService
        .getAggregationTypes(this.data.fields, type);

      this.displayType = this.displayTypes
        .filter((el: any) => { return el.type === type; })[0];
    }
    return true;

  }


  public runAggregation(): boolean {
    let parsedAggs: any = {};

    if (this.useTextEditor) {
      parsedAggs = this.parseAggs(this.aggs);
    }

    this.result.emit({
      type: this.displayType.type,
      aggregations: this.useTextEditor ? parsedAggs : this.aggs,
      searchObjectName: this.data.searchObjectName,
      fieldToCount: this.data.fieldToCount,
    });
    return true;
  }

  private parseAggs(aggs: any) {
    let parsed = {};
    try {
      parsed = JSON.parse(this.aggs)
    } catch (err) {
      alert('Parsing aggregation string error see console')
      console.log(err);
    }

    return parsed;
  }


  public showAggregation(): void {
    console.log(this.aggs);
  }

  debug(o: any): string { return JSON.stringify(o); }

}
