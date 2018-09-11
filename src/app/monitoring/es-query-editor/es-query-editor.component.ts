import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EsChartRequest } from 'app/monitoring/model/es-chart-request';
import { Chart } from '../model/chart';
import { ChartRequest } from '../model/chart-request';




@Component({
  selector: 'sb-es-query-editor',
  templateUrl: './es-query-editor.component.html',
  styleUrls: ['./es-query-editor.component.scss']
})
export class EsQueryEditorComponent implements OnInit {
  @Input()
  choosenChart: Chart;
  @Input()
  public chartRequest: ChartRequest;
  @Output('success')
  success = new EventEmitter();
  @Output('cancel')
  cancel = new EventEmitter();
  public sizeOptions: Array<number>;
  public size: number;
  public name: string;

  appId: string;
  space: string;
  appName: string;
  constructor() {
    this.sizeOptions = Array.from(new Array(12), (val, index) => index + 1);
  }

  ngOnInit() {
    if (this.chartRequest) {
      if (this.chartRequest.size) {
        this.size = this.chartRequest.size;
      }
      this.appId = this.chartRequest['appId'];
    }
  }
  public buildChartRequest() {
    if (this.appId) {
      const chartRequest = {
        space: this.space,
        chartId: this.choosenChart.id,
        name: this.name
      } as EsChartRequest;
      chartRequest.appId = this.appId ?  this.appId : undefined;
      chartRequest.appName = this.appName ? this.appName : undefined;
      if (this.size) {
        if (typeof this.size === 'string') {
          this.size = parseInt(this.size as string);
        }
        chartRequest.size = this.size;
      }
      this.success.emit(chartRequest);
    }
  }
  public cancelCreation() {
    this.cancel.emit();
  }
}
