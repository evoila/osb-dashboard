import * as fromStore from '../../store';
import * as chartTypes from '../../model/chart-types';

import { OptionsState } from 'app/monitoring/chart-configurator/store/reducers/options.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { SetChartType } from '../../store/actions/chart.increation.action';

@Component({
  selector: 'sb-base-chart',
  templateUrl: './base-chart.component.html',
  styleUrls: ['./base-chart.component.scss']
})
export class BaseChartComponent implements OnInit {
  // use this with async pipe in Template options$ | asınyc
  public charts: Array<any> = [];

  ngOnInit() {
    let tempObject: any = {};
    Object.keys(chartTypes.chartObjectForType).forEach((k, index, array) => {
      tempObject = { ...tempObject, [k]: chartTypes.chartObjectForType[k] };
      if ((index + 1) % 2 == 0 || index + 1 === array.length) {
        this.charts = [...this.charts, { ...tempObject }];
        tempObject = {};
      }
    });
  }
  public chooseChart(chartName: string) {
    this.store.dispatch(new fromStore.SetChartType(chartName));
    this.store.dispatch(new fromStore.NavigateToOptions(chartName));
  }
  constructor(private store: Store<OptionsState>) {}
}
