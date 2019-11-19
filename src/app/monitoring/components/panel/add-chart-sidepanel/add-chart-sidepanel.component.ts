import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartModelState } from '../../../shared/store/reducers/chart.reducer';
import { LoadCharts, DeleteChart } from '../../../shared/store/actions/chart.actions';
import { Observable } from 'rxjs';
import { getCharts } from '../../../shared/store/selectors/chart.selector';
import { Chart } from '../../../shared/model/chart';
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';


@Component({
  selector: 'sb-add-chart-sidepanel',
  templateUrl: './add-chart-sidepanel.component.html',
  styleUrls: ['./add-chart-sidepanel.component.scss']
})
export class AddChartSidepanelComponent implements OnInit {
  @Output('ended')
  ended = new EventEmitter<CdkDragEnd>();

  @Output('started')
  started = new EventEmitter<CdkDragStart>();

  charts$: Observable<Array<Chart>>;
  constructor(private chartStore: Store<ChartModelState>) { }

  ngOnInit() {
    this.chartStore.dispatch(new LoadCharts());
    this.charts$ = this.chartStore.select(getCharts);
  }
  end(event: CdkDragEnd) {
    console.log('fire');
    // push end event in parent component
    this.ended.next(event);
  }
  start(event: CdkDragStart) {
    console.log('fire');
    this.started.next(event);
  }

  deleteChart(chart: Chart) {
    console.log("delete chart here");
    this.chartStore.dispatch(new DeleteChart(chart.id!!));
  }
}
