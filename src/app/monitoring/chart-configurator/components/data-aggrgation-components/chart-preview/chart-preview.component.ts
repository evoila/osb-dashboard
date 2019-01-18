import { Component, OnInit } from '@angular/core';
import { ChartIncreationState } from '../../../store/reducers/chart.increation.reducer';
import { Store } from '@ngrx/store';
import {
  getChartIncreationAggregationResponse,
  getReadyForRequestAggregationsArray
} from '../../../store/selectors/chart.increation.selector';
import { filter, map, switchMap } from 'rxjs/operators';
import { AggregationRequestObject } from '../../../model/aggregationRequestObject';
import { Observable } from 'rxjs';
import { SearchResponse } from '../../../../model/search-response';
import { ChartingService } from '../../../../services/charting.service';
import { Chart } from '../../../../model/chart';
import {
  getChartIncreationOptions,
  getChartIncreationType
} from '../../../store/selectors/chart.increation.selector';

@Component({
  selector: 'sb-chart-preview',
  templateUrl: './chart-preview.component.html',
  styleUrls: ['./chart-preview.component.scss']
})
export class ChartPreviewComponent implements OnInit {
  private queryAndResponse$: Observable<
    Array<{
      aggregation: AggregationRequestObject;
      response: SearchResponse;
    }>
  >;
  public chart: Chart;
  constructor(
    private store: Store<ChartIncreationState>,
    private chartingService: ChartingService
  ) {}

  ngOnInit() {
    // get the Aggregation Matching the Result cause the Charting Utils Service
    // needs it to be displayed correctly
    this.queryAndResponse$ = this.store
      .select(getChartIncreationAggregationResponse)
      .pipe(
        filter(k => k && k.length > 0),
        switchMap(response => {
          return this.store.select(getReadyForRequestAggregationsArray).pipe(
            filter(aggregations => aggregations.length == response.length),
            map(aggregations => {
              return aggregations.map((agg, i) => {
                return { aggregation: agg, response: response[i] };
              });
            })
          );
        })
      );
    this.transformDataForChart();
  }

  private transformDataForChart() {
    // TODO: minimize code to be one store call and handle more complex calls in Selectors as
    // they have access to all Objects
    this.store
      .select(getChartIncreationOptions)
      .pipe(
        switchMap(options => {
          return this.queryAndResponse$.pipe(
            map(queRey =>
              // Filter error Responses and Empty responses
              queRey.filter(
                k =>
                  !k.response['error'] &&
                  k.response['aggregations'][
                    Object.keys(k.response['aggregations'])[0]
                  ]['buckets'].length != 0
              )
            ),
            map(queReys => {
              return queReys.map(queRey => {
                return this.chartingService.unwrapForPlotBucket(
                  new Chart(),
                  queRey.aggregation.aggregation.actualAggregation,
                  queRey.response.aggregations
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
              return { ...chart, options: options.options };
            })
          );
        }),
        switchMap(chart => {
          return this.store.select(getChartIncreationType).pipe(
            map(type => {
              return { ...chart, type };
            })
          );
        })
      )
      .subscribe(chart => {
        this.chart = chart;
      });
  }
}
