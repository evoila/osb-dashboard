import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ChartIncreationState } from '../../../store/reducers/chart.increation.reducer';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, catchError, take, debounceTime, distinctUntilChanged, delay, tap } from 'rxjs/operators';
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
import { SetChartImage } from 'app/monitoring/chart-configurator/store';
import { getAggregationAndResponse } from '../../../store/selectors/chart.increation.selector';
import { DeleteFailedAggregation, SetFailedAggregation } from '../../../store/actions/chart.increation.action';



@Component({
  selector: 'sb-chart-preview',
  templateUrl: './chart-preview.component.html',
  styleUrls: ['./chart-preview.component.scss']
})
export class ChartPreviewComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas')
  set canvas(content: ElementRef) {
    if (content) {
      this.myCanvas = content;
      this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d')!!;
    }
  }
  myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;


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

  ngAfterViewInit() {
  }
  ngOnDestroy() {
    this.store.dispatch(new DeleteFailedAggregation());
  }
  ngOnInit() {
    // get the Aggregation Matching the Result cause the Charting Utils Service
    // needs it to be displayed correctly
    if (!this.aggregation$) {
      this.queryAndResponse$ = this.store.select(getAggregationAndResponse).pipe(
        distinctUntilChanged((prev, curr) => {
          let returnVal = true;
          if (prev.length == 0 || prev.length != curr.length) {
            return false;
          }
          prev.forEach((k, i) => {
            if (k.aggregation.appId !== curr[i].aggregation.appId || k.aggregation.aggregation.id !== curr[i].aggregation.aggregation.id) {
              returnVal = false;
              return false;
            }
          });
          return returnVal;
        }),
        filter(k => !!k.length));
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

  renderImage() {
    if (!this.aggregation$) {
      //little delay needed to have canvas fully rendered
      of(true).pipe(delay(700)).subscribe(k => {
        const dataUrlImg = this.myCanvas.nativeElement.toDataURL("image/png", 0.1);
        this.store.dispatch(new SetChartImage(dataUrlImg));
      })
    }
  }

  private transformDataForChart() {
    // TODO: minimize code to be one store call and handle more complex calls in Selectors as
    // they have access to all Objects
    this.store
      .select(getChartIncreationOptions)
      .pipe(
        debounceTime(1000),
        switchMap(options => {
          return this.queryAndResponse$.pipe(
            // Wirte out Errors on Aggregations
            tap(k => {
              const errors = k.filter(a => a.response['error']);
              // Write out
              errors.forEach(a => this.store.dispatch(new SetFailedAggregation(a)));
              if (!errors.length) {
                this.store.dispatch(new DeleteFailedAggregation());
              }
            }),
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
            debounceTime(1000),
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
