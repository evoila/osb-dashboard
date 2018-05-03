import { Component, OnInit } from '@angular/core';
import { PanelService } from 'app/monitoring/panel.service';
import { environment } from 'environments/runtime-environment';
import { Panel } from 'app/monitoring/model/panel';
import { ChartType } from 'chart.js';
import { Event } from '@angular/router/src/events';
import { ChartRequestVm } from 'app/monitoring/model/chart-request-vm';
import * as moment from 'moment/moment';
import { EsTimerangeService } from 'app/monitoring/es-timerange.service';

import { EsChartRequest } from 'app/monitoring/model/es-chart-request';

@Component({
  selector: 'sb-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  public panels: Array<Panel>;
  public panel: Panel;
  public menu: { [k: string]: any } = {};
  public fromDate: any;
  public fromDateView: any;
  private fromDateString: string = "Choose Date";
  public toDate: any;
  public toDateView: any;
  private toDateString: string = "Choose Date";
  private isCollapsedFrom = false;
  private isCollapsedTo = false;
  private stepUnits = ['s', 'm', 'h'];
  private step: string;
  private stepUnit: string;
  constructor(private panelService: PanelService,
    private timeRangeService: EsTimerangeService) {
    this.menu['view'] = 'Views:';
    this.menu['viewSettings'] = ['1', '2', '3'];
  }

  ngOnInit() {
    this.panelService.getAllPanels(environment.serviceInstanceId).
      subscribe(data => {
        console.log(data);
        this.panels = data;
        if (this.panels && this.panels.length) {
          this.setPanel(this.panels[0]);
        }
      });
    if (!this.fromDate && !this.toDate) {
      this.toDate = moment();
      this.fromDate = moment(this.toDate).subtract(5, 'days');

      this.toDateString = this.getDateAsString(this.toDate);
      this.fromDateString = this.getDateAsString(this.fromDate);
    }
  }
  private setFromDate() {
    if (this.isCollapsedFrom) {
      this.fromDate = moment(this.fromDateView);
      this.isCollapsedFrom = !this.isCollapsedFrom;
      this.fromDateString = this.getDateAsString(this.fromDate);
      this.setDateRange();
    }
  }
  private setToDate() {
    if (this.isCollapsedTo) {
      this.toDate = moment(this.toDateView);
      this.isCollapsedTo = !this.isCollapsedTo;
      this.toDateString = this.getDateAsString(this.toDate);
      this.setDateRange();
    }
  }
  private setDateRange() {
    if (this.toDate && this.fromDate && this.panel && this.panel.chartQueries) {
      this.panel.chartQueries.forEach(element => {
        const start = moment(this.fromDate).unix();
        const end = moment(this.toDate).unix();
        if (element['appId'] == null) {
          element['start'] = start;
          element['end'] = end;
          if (this.step && this.stepUnit) {
            element['step'] = this.step + this.stepUnit;
          }
        } else {
          element = this.timeRangeService.setTimeRange(element as EsChartRequest, start, end);
        }

      });
    }
    this.buildView();
  }
  private getDateAsString(date: any): string {
    return moment(date).format('DD:MM:YY, hh:mm:ss a');
  }
  public setPanel(panel: Panel) {
    this.panel = panel;
    if (!this.panel.chartQueries) {
      this.panel.chartQueries = [];
    }
    if (this.panel.esChartQueries) {
      this.panel.chartQueries = [...this.panel.chartQueries, ...this.panel.esChartQueries];
    }
    if (this.panel.promChartQueries) {
      this.panel.chartQueries = [...this.panel.chartQueries, ...this.panel.promChartQueries];
    }
    this.panel.chartQueries = this.panel.chartQueries.sort((k, j) => k.order - j.order);
    this.buildView();
  }
  private buildView() {
    //Method that builds up view with given Number of Rows
    let u = 0;
    let size: number = 0;
    this.panel.chartView = [];
    for (let chartQuerie of this.panel.chartQueries) {
      const isEs = chartQuerie['appId'] != null;
      let chartRqVm: ChartRequestVm = new ChartRequestVm();
      chartRqVm = Object.assign(chartQuerie);
      chartRqVm.isEs = isEs;
      if (size + chartQuerie.size > 10) {
        u++;
        size = 0;
      }
      if (this.panel.chartView[u]) {
        this.panel.chartView[u] = [...this.panel.chartView[u], chartRqVm]
      } else {
        this.panel.chartView[u] = [chartRqVm]
      }
      size += chartQuerie.size;
    }
  }
}

