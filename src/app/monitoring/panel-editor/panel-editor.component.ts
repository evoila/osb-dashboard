import { Component, OnInit } from '@angular/core';
import { ChartRequest } from 'app/monitoring/model/chart-request';
import { ChartRequestVm } from 'app/monitoring/model/chart-request-Vm';
import { PanelService } from '../panel.service';
import { Panel } from '../model/panel';
import { environment } from 'environments/runtime-environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { EsChartRequest } from 'app/monitoring/model/es-chart-request';
import { PrometheusChartRequest } from 'app/monitoring/model/prom-chart-request';



@Component({
  selector: 'sb-panel-editor',
  templateUrl: './panel-editor.component.html',
  styleUrls: ['./panel-editor.component.scss']
})
export class PanelEditorComponent implements OnInit {
  esChartQueries: Array<EsChartRequest>;
  promChartQueries: Array<PrometheusChartRequest>;
  chartVms: Array<ChartRequestVm>;
  name: string;
  description: string;
  public isCollapsed = true;
  private _success = new Subject<string>();
  private successMessage?: String;
  constructor(
    private panelService: PanelService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this._success.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._success, 2000).subscribe(() => this.successMessage = undefined);
  }
  public addToVm(chartRequest: any, isEs: boolean) {
    const chartRequestVm = chartRequest as ChartRequestVm;
    chartRequestVm.isEs = isEs;
    if (!this.chartVms) {
      this.chartVms = [chartRequestVm];
    } else {
      this.chartVms = [...this.chartVms, chartRequestVm];
    }
  }
  public deleteChartRequest(chartRequest: any) {
    console.log(chartRequest);
    this.chartVms = this.chartVms.filter(k => k !== chartRequest);
  }
  public addEsRequest(chartRequest: PrometheusChartRequest) {
    this.isCollapsed = true;
    this.addToVm(chartRequest, true);
  }
  public addPromRequest(chartRequest: any) {
    this.isCollapsed = true;
    //Add Timestamp for Preview which will be removed later
    const nowTs = Math.floor(Date.now() / 1000);
    chartRequest.end = nowTs;
    chartRequest.start = nowTs - 43200;
    chartRequest.step = '10m';
    this.addToVm(chartRequest, false);
  }
  public fillProm(chartRequest: any) {
    if (this.promChartQueries) {
      this.promChartQueries = [...this.promChartQueries, chartRequest];
    } else {
      this.promChartQueries = [chartRequest];
    }
  }
  public fillEs(chartRequest: any) {
    if (this.esChartQueries) {
      this.esChartQueries = [...this.esChartQueries, chartRequest];
    } else {
      this.esChartQueries = [chartRequest];
    }
  }
  private prepareForRequest() {
    this.esChartQueries = [];
    this.promChartQueries = [];
    if (this.chartVms.length !== 0) {
      this.chartVms.forEach(
        (element, index) => {
          element.order = index
          if (element.isEs) {
            delete element.isEs;
            this.fillEs(element);
          } else {
            delete element.isEs;
            this.fillProm(element);
          }
        }
      );
    }
  }
  private onDrop(dragData: any, target: ChartRequestVm) {
    console.log(dragData, target);
    const targetIndex = this.chartVms.indexOf(target);
    this.chartVms = this.chartVms.filter( k => k !== dragData.dragData)
    this.chartVms.splice(targetIndex, 0, dragData.dragData as ChartRequestVm);
  }
  public create() {
    this.prepareForRequest();
    const hasCharts = (this.esChartQueries && this.esChartQueries.length) || (this.promChartQueries && this.promChartQueries.length);
    if (this.name && hasCharts) {
      const panel: Panel = {
        serviceInstanceId: environment.serviceInstanceId,
        esChartQueries: this.esChartQueries,
        promChartQueries: this.promChartQueries,
        name: this.name
      };
      if (this.description) {
        panel.description = this.description;
      }
      this.panelService.addPanel(panel).subscribe(
        k => {
          this._success.next('panel created successfully redirecting now!');
        }
      );
    }
  }

}
