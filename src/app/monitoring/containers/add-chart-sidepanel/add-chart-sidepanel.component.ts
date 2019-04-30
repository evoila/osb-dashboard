import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartModelState } from '../../shared/store/reducers/chart.reducer';
import { LoadCharts } from '../../shared/store/actions/chart.actions';
import { Observable } from 'rxjs';
import { getCharts } from '../../shared/store/selectors/chart.selector';
import { Chart } from '../../shared/model/chart';

@Component({
  selector: 'sb-add-chart-sidepanel',
  templateUrl: './add-chart-sidepanel.component.html',
  styleUrls: ['./add-chart-sidepanel.component.scss']
})
export class AddChartSidepanelComponent implements OnInit {

  charts$: Observable<Array<Chart>>;
  constructor(private chartStore: Store<ChartModelState>) { }

  ngOnInit() {
    this.chartStore.dispatch(new LoadCharts());
    this.charts$ = this.chartStore.select(getCharts);
  }

}
