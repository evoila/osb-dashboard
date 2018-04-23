import { Component, OnInit } from '@angular/core';
import { ChartRequest } from 'app/monitoring/model/chart-request';
import { ChartRequestVm } from 'app/monitoring/model/chart-request-vm';
import { PanelService } from '../panel.service';
import { Panel } from '../model/panel';
import { environment } from 'environments/runtime-environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { Subject } from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
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
  public addEsRequest(chartRequest: any) {
    if (this.esChartQueries) {
      this.esChartQueries = [...this.esChartQueries, chartRequest];
    } else {
      this.esChartQueries = [chartRequest];
    }
    console.log(chartRequest)
    this.isCollapsed = true;
  }
  public create() {
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
