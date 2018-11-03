import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartRequestVm } from 'app/monitoring/model/chart-request-vm';
import { PanelService } from '../panel.service';
import { Panel } from '../model/panel';
import { environment } from 'environments/runtime-environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

import { EsChartRequest } from 'app/monitoring/model/es-chart-request';
import { PrometheusChartRequest } from 'app/monitoring/model/prom-chart-request';
import { ActivatedRoute, Router } from '@angular/router/';
import { WizardComponent } from 'app/core/wizard';


@Component({
  selector: 'sb-panel-editor',
  templateUrl: './panel-editor.component.html',
  styleUrls: ['./panel-editor.component.scss']
})
export class PanelEditorComponent implements OnInit {
  panel: Panel
  esChartQueries: Array<EsChartRequest>;
  promChartQueries: Array<PrometheusChartRequest>;
  chartVms: Array<ChartRequestVm>;
  name: string;
  description: string;
  public isCollapsed = true;
  public _success = new Subject<string>();
  public successMessage?: String;
  @ViewChild(WizardComponent) wizard: WizardComponent;

  constructor(
    private panelService: PanelService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this._success.subscribe((message) => this.successMessage = message);

    if (this.route.snapshot.paramMap.has('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.getPanel(id as string);
    }
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
  private getPanel(id: string) {
    this.panelService.getSpecificPanel(id).subscribe(data => {
      this.panel = data;
      this.name = this.panel.name;
      if (this.panel.description) {
        this.description = this.panel.description;
      }
      this.unwrapQueries();
    },
      error => {
        this._success.next("Error: Couldn't load Panel!");
      });
  }
  private unwrapQueries() {
    this.panel.promChartQueries.forEach(
      data => {
        this.addToVm(data, false);
      }
    );
    this.panel.esChartQueries.forEach(
      data => {
        this.addToVm(data, true);
      }
    );
    this.chartVms.sort((k, m) => k.order - m.order)
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
    this.chartVms = this.chartVms.filter(k => k !== dragData.dragData)
    this.chartVms.splice(targetIndex, 0, dragData.dragData as ChartRequestVm);
  }
  public create() {
    this.prepareForRequest();
    const hasCharts = (this.esChartQueries && this.esChartQueries.length) || (this.promChartQueries && this.promChartQueries.length);
    if (this.name && hasCharts) {
      if (!this.panel) {
        this.panel = new Panel();
      }
      this.panel.esChartQueries = this.esChartQueries;
      this.panel.promChartQueries = this.promChartQueries;
      this.panel.serviceInstanceId = environment.serviceInstanceId;
      this.panel.name = this.name;
      if (this.description) {
        this.panel.description = this.description;
      }
      this.panelService.addPanel(this.panel).subscribe(
        k => {
          console.log(k);
          this._success.next('panel created successfully redirecting now!');
          this.router.navigate(['/monitoring/panel/' + k.panelId]);
        },
        error => {
          this._success.next("Error: Couldn't save Panel!" + error);
        }
      );
    } else {
      this._success.next("Required Input is missing");
    }
  }

  public next($event) {
    this.wizard.next();
  }

}
