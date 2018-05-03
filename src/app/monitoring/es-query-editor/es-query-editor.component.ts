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
  @Output('success')
  success = new EventEmitter();
  @Output('cancel')
  cancel = new EventEmitter();
  private sizeOptions: Array<Number>;
  private size: number;

  appId: string;
  constructor() {
    this.sizeOptions = Array.from(new Array(12), (val, index) => index + 1);
  }

  ngOnInit() {
  }
  public buildChartRequest() {
    if (this.appId) {
      const chartRequest = {
        appId: this.appId,
        chartId: this.choosenChart.id
      } as EsChartRequest;
      if (this.size) {
        chartRequest.size = this.size;
      }
      this.success.emit(chartRequest);
    }
  }
  public cancelCreation() {
    this.cancel.emit();
  }
}
