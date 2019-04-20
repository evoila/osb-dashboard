import { Component, OnInit, Input } from '@angular/core';
import { ChartIncreationState } from '../../../store/reducers/chart.increation.reducer';
import { Store } from '@ngrx/store';
import {
  getChartIncreationAggregationResponse,
  getReadyForRequestAggregationsArray
} from '../../../store/selectors/chart.increation.selector';
import { filter, map, switchMap, catchError } from 'rxjs/operators';
import { AggregationRequestObject } from '../../../model/aggregationRequestObject';
import { Observable, of, throwError as observableThrowError, throwError } from 'rxjs';
import { SearchResponse } from '../../../../model/search-response';
import { ChartingService } from '../../../../services/charting.service';
import { Chart } from '../../../../model/chart';
import {
  getChartIncreationOptions,
  getChartIncreationType
} from '../../../store/selectors/chart.increation.selector';
import { SearchService } from 'app/monitoring/shared/services/search.service';

@Component({
  selector: 'sb-chart-preview',
  templateUrl: './chart-preview.component.html',
  styleUrls: ['./chart-preview.component.scss']
})
export class ChartPreviewComponent implements OnInit {
  @Input('aggregation')
  aggregation$: Observable<AggregationRequestObject>;
  private queryAndResponse$: Observable<
    Array<{
      aggregation: AggregationRequestObject;
      response: SearchResponse;
    }>
  >;
  public chart: Chart;
  constructor(
    private store: Store<ChartIncreationState>,
    private chartingService: ChartingService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    // get the Aggregation Matching the Result cause the Charting Utils Service
    // needs it to be displayed correctly
    if (!this.aggregation$) {
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
    } else {
      // the input is used in the Aggregation Preview. Since store Handling of the aggregation doesn't
      // make any sense, caus this component is the only one using it, we use the service directly
      this.queryAndResponse$ = this.aggregation$.pipe(
        switchMap(k => {
          return this.searchService.fireAggregation([k]).pipe(
            filter(m => !!m && m.length > 0),
            map(m => {
              return [{ aggregation: k, response: m[0] }];
            }),
            catchError(err => of([]))
          )
        }),
        catchError(err => throwError(err))
      )
      this.transformDataForChart();
    }
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
                  queRey.aggregation.name!!,
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
