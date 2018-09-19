import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EsChartRequest } from 'app/monitoring/model/es-chart-request';
import { Chart } from '../model/chart';
import { ChartRequest } from '../model/chart-request';
import { ServiceBinding } from '../model/service-binding';




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
  public choosenApp: ServiceBinding;

  constructor() {
    this.sizeOptions = Array.from(new Array(12), (val, index) => index + 1);
  }

  ngOnInit() {
    if (this.chartRequest) {
      if (this.chartRequest.size) {
        this.size = this.chartRequest.size;
      }
      this.choosenApp = {
        appName: this.chartRequest['appName'],
        space: this.chartRequest['space'],
        organization_guid: this.chartRequest['orgId']
      } as ServiceBinding;
    }
  }

  public setApp(app: ServiceBinding) {
    this.choosenApp = app;
  }
  public buildChartRequest() {
    if (this.choosenApp) {
      const chartRequest = {
        appName: this.choosenApp.appName,
        space: this.choosenApp.space,
        orgId: this.choosenApp.organization_guid,
        name: this.name,
        chartId: this.choosenChart.id
      } as EsChartRequest;
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
