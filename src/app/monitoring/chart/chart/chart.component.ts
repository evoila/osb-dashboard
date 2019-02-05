import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Chart as ChartModel } from '../../model/chart';
import { ChartingService } from '../../services/charting.service';

import { ChartInPanel } from '../../model/chart-in-panel';
import { ChartModelState } from '../../shared/store/reducers/chart.reducer';
import { Store, select } from '@ngrx/store';
import { FireAggregationRequest } from '../../shared/store/actions/chart.actions';
import { getAggregationResponseAndLoaded } from 'app/monitoring/shared/store/selectors/chart.selector';
import { filter, map } from 'rxjs/operators';
import { getAggregationResponseAndLoadedById } from '../../shared/store/selectors/chart.selector';

@Component({
  selector: 'sb-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input('chart')
  chart: ChartInPanel;
  chartView: ChartModel;
  options: boolean;
  constructor(
    private chartingService: ChartingService,
    private store: Store<ChartModelState>
  ) { }

  ngOnInit() {
    this.store.dispatch(
      new FireAggregationRequest(this.chart.chart.aggregations, this.chart.id!!)
    );
    this.updateEsChart();
  }

  public ngOnDestroy() { }

  public update() { }

  private updateEsChart(): void {
    this.store
      .pipe(select(getAggregationResponseAndLoadedById, this.chart.id))
      .pipe(
        filter(k => k != undefined && Object.keys(k.results).length > 0),
        map(result => {
          return result!!.results.map(k => {
            return this.chartingService.unwrapForPlotBucket(
              new ChartModel(),
              k.query.aggregation.actualAggregation,
              k.query.aggregation.name,
              k.response.aggregations
            );
          });
        }),
        filter(charts => charts.length > 0),
        map(charts => {
          return charts.reduce((acc, chart, index, arr) => {
            if (index == 0) {
              return chart;
            } else {
              let labels = acc.labels;
              if (chart.labels > acc.labels) {
                labels = chart.labels;
              }
              return {
                ...acc,
                data: [...acc.data, ...chart.data],
                series: [...acc.series, ...chart.series],
                labels: labels
              };
            }
          });
        }),
        map(chart => {
          return {
            ...chart,
            options: this.chart.chart.option,
            type: this.chart.chart.type
          };
        })
      )
      .subscribe(k => (this.chartView = k));
  }
}
