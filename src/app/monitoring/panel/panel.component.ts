import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PanelService } from 'app/monitoring/panel.service';
import { environment } from 'environments/runtime-environment';
import { Panel } from 'app/monitoring/model/panel';
import { ChartType } from 'chart.js';
import { Event } from '@angular/router/src/events';
import { ChartRequestVm } from 'app/monitoring/model/chart-request-vm';
import * as moment from 'moment/moment';
import { EsTimerangeService } from 'app/monitoring/es-timerange.service';

import { EsChartRequest } from 'app/monitoring/model/es-chart-request';
import { ChartRequest } from 'app/monitoring/model/chart-request';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { Subject } from 'rxjs/Subject';
import { error } from 'selenium-webdriver';



@Component({
  selector: 'sb-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
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
  private changed = false;
  private _success = new Subject<string>();
  private successMessage?: String;
  constructor(private panelService: PanelService,
    private timeRangeService: EsTimerangeService,
    private router: Router,
    private route: ActivatedRoute) {
    this.menu['view'] = 'Views:';
    this.menu['viewSettings'] = ['1', '2', '3'];
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || null;
    if (id) {
      this.panelService.getSpecificPanel(id).
        subscribe(data => {
          this.setPanel(data);
          this.setDateRange();
        });
      if (!this.fromDate && !this.toDate) {
        this.toDate = moment();
        this.fromDate = moment(this.toDate).subtract(5, 'days');

        this.toDateString = this.getDateAsString(this.toDate);
        this.fromDateString = this.getDateAsString(this.fromDate);
      }
      this._success.subscribe((message) => this.successMessage = message);
      debounceTime.call(this._success, 2000).subscribe(() => this.successMessage = undefined);
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
  private edit() {
    if (this.changed) {
      this.saveChanges();
    }
    const panelId = this.panel ? this.panel.panelId : null;
    this.router.navigate(['/monitoring/paneleditor', { id: panelId }]);
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
  private onDrop(dragData: any, target: ChartRequest) {
    if (this.panel.chartQueries) {
      const targetIndex = this.panel.chartQueries.indexOf(target);
      this.panel.chartQueries = this.panel.chartQueries.filter(k => k !== dragData.dragData);
      this.panel.chartQueries.splice(targetIndex, 0, dragData.dragData as ChartRequestVm);
      this.changed = true;
      this.buildView();
    }
  }
  private editChart(chart: Chart, chartRequest: ChartRequest) {
    chartRequest['onEdit'] = true;
    chartRequest['choosenChart'] = chart;
  }
  private saveChartQuery(newRequest: ChartRequest, oldRequest: ChartRequest) {
    delete oldRequest['onEdit'];
    delete oldRequest['choosenChart'];
    if (this.panel.chartQueries) {
      const targetIndex = this.panel.chartQueries.indexOf(oldRequest);
      this.panel.chartQueries = this.panel.chartQueries.filter(k => k !== oldRequest);
      newRequest = Object.assign(oldRequest, newRequest);
      this.panel.chartQueries.splice(targetIndex, 0, newRequest as ChartRequestVm);
      this.changed = true;
      this.setDateRange();
    }
  }
  private saveChanges() {
    this.prepareForRequest(new Panel());
    this.panelService.addPanel(this.panel).subscribe(data => {
      this._success.next('panel updated succesfully');
      this.setPanel(data);
    }, (error) => {
      this._success.next('panel updated succesfully');
    }
    );
  }
  public fillProm(chartRequest: any, panel: Panel) {
    if (panel.promChartQueries) {
      panel.promChartQueries = [...panel.promChartQueries, chartRequest];
    } else {
      panel.promChartQueries = [chartRequest];
    }
  }
  public fillEs(chartRequest: any, panel: Panel) {
    if (panel.esChartQueries) {
      panel.esChartQueries = [...panel.esChartQueries, chartRequest];
    } else {
      panel.esChartQueries = [chartRequest];
    }
  }

  private prepareForRequest(panel: Panel) {
    panel.esChartQueries = [];
    panel.promChartQueries = [];
    if (this.panel.chartQueries && this.panel.chartQueries.length !== 0) {
      this.panel.chartQueries.forEach(
        (element, index) => {
          element.order = index
          delete element['isEs'];
          if (element['appId']) {
            this.fillEs(element, panel);
          } else {
            this.fillProm(element, panel);
          }
        }
      );
    }
  }
  private cancelEdit(chartRequest: ChartRequest) {
    delete chartRequest['onEdit'];
    delete chartRequest['choosenChart'];
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
      if (size + chartQuerie.size > 12) {
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

