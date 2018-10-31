import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PanelService } from 'app/monitoring/panel.service';
import { environment } from 'environments/runtime-environment';
import { Panel } from 'app/monitoring/model/panel';
import { ChartType } from 'chart.js';
import { Event, NavigationEnd } from '@angular/router';
import { ChartRequestVm } from 'app/monitoring/model/chart-request-vm';
import * as moment from 'moment/moment';
import { EsTimerangeService } from 'app/monitoring/es-timerange.service';

import { EsChartRequest } from 'app/monitoring/model/es-chart-request';
import { ChartRequest } from 'app/monitoring/model/chart-request';

import { Subject } from 'rxjs';
import { error } from 'selenium-webdriver';
import { filter, map } from 'rxjs/internal/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { NotificationType } from '../../core/notification.service';
import { Notification, NotificationService } from 'app/core';






@Component({
  selector: 'sb-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  public panel: Panel;
  public menu: { [k: string]: any } = {};
  public fromDateView: any;
  public toDateView: any;
  private steps: [string, string]
  private changed = false;
  private successMessage?: String;
  constructor(private panelService: PanelService,
    private timeRangeService: EsTimerangeService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute) {
    this.menu['view'] = 'Views:';
    this.menu['viewSettings'] = ['1', '2', '3'];
  }
  ngOnInit() {
    this.getData(this.route.snapshot.paramMap.get('id') || null);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute)
      , map((rt) => {
        while (rt.firstChild) {
          rt = rt.firstChild;
        }
        return rt.snapshot.paramMap.get('id') || null;
      }))
      .subscribe((event) => {
        console.log(event);
        this.getData(event);
      });
  }
  getData(id: any) {
    if (id) {
      this.panelService.getSpecificPanel(id).
        subscribe(data => {
          this.setPanel(data);
          this.setDateRange();
        });
      if (!this.fromDateView && !this.toDateView) {
        this.steps = ['6', 'h'];
        this.toDateView = moment().unix();
        this.fromDateView = moment().subtract(5, 'days').unix();
      }
    }
  }

  setFromDate(date: any) {
    this.fromDateView = date;
    this.setDateRange();
  }
  setToDate(date: any) {
    this.toDateView = date;
    this.setDateRange();
  }
  setStep(step: [string, string]) {
    this.steps = step;
    this.setDateRange();
  }
  private setDateRange() {
    if (this.toDateView && this.fromDateView && this.panel && this.panel.chartQueries) {
      this.panel.chartQueries.forEach(element => {
        if (element['metrics'] != null) {
          element['start'] = this.fromDateView;
          element['end'] = this.toDateView;
          if (this.steps) {
            element['step'] = this.steps[0] + this.steps[1];
          }
        } else {
          element = this.timeRangeService.setTimeRange(element as EsChartRequest, this.fromDateView, this.toDateView);
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
      this.notification.addSelfClosing(new Notification(NotificationType.Info, 'panel updated succesfully'));
      this.setPanel(data);
      this.changed = false;
    }, (err) => {
      this.notification.addSelfClosing(new Notification(NotificationType.Info, 'an error occured'));
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
      const isEs = chartQuerie['metrics'] == null;
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

