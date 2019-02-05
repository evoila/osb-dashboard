import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import * as moment from 'moment/moment';
import { EsTimerangeService } from 'app/monitoring/services/es-timerange.service';

import { ChartRequest } from 'app/monitoring/model/chart-request';

import { filter, map, switchMap, take, takeLast } from 'rxjs/operators';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { PanelVm } from 'app/monitoring/shared/model/panel.vm';
import { PanelState } from 'app/monitoring/shared/store/reducers/panel.reducer';
import { Store, select } from '@ngrx/store';
import { getPanelViewModelById } from '../../shared/store/selectors/panel.selector';
import { State } from 'app/monitoring/store';
import { getParams } from '../../store/reducers/index';

@Component({
  selector: 'sb-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  public panel: PanelVm;
  public menu: { [k: string]: any } = {};
  public fromDateView: any;
  public toDateView: any;
  public steps: [string, string];
  public changed = false;
  public timeRange: { [key: string]: any };
  edit: boolean;
  constructor(
    private timeRangeService: EsTimerangeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<PanelState>,
    private routerStore: Store<State>
  ) {
    this.menu['view'] = 'Views:';
    this.menu['viewSettings'] = ['1', '2', '3'];
  }
  ngOnInit() {
    this.registerRouterEvents();
  }

  registerRouterEvents() {
    this.routerStore
      .select(getParams)
      .pipe(
        switchMap((params: Params) =>
          this.store
            .pipe(select(getPanelViewModelById, params['id']))
            .pipe(take(1))
        ),
        filter(
          (k: any) =>
            k != undefined &&
            k != {} &&
            (k.charts != null && k.charts != undefined)
        ),
        map(k => {
          return { ...k };
        })
      )
      .subscribe(k => {
        this.panel = { ...k };
        console.log(this.panel);
      });
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
    if (this.toDateView && this.fromDateView) {
      this.timeRange = this.timeRangeService.setTimeRange(
        this.fromDateView,
        this.toDateView
      );
    }
  }

  private getDateAsString(date: any): string {
    return moment(date).format('DD:MM:YY, hh:mm:ss a');
  }

  private onDrop(dragData: CdkDragDrop<String[]>, target: ChartRequest) { }

  private editChart(chart: Chart, chartRequest: ChartRequest) {
    chartRequest['onEdit'] = true;
    chartRequest['choosenChart'] = chart;
  }

  private saveChartQuery(newRequest: ChartRequest, oldRequest: ChartRequest) { }
  private saveChanges() { }
}
