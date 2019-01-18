import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as fromChart from '../actions/chart.actions';
import { ChartService } from '../../services/chart.service';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { SearchResponse } from '../../../model/search-response';
import { AggregationRequestObject } from '../../../chart-configurator/model/aggregationRequestObject';

@Injectable()
export class ChartEffect {
  @Effect()
  loadCharts$ = this.actions.ofType(fromChart.LOAD_CHARTS).pipe(
    switchMap(action => {
      return this.chartService.getAllCharts().pipe(
        map(result => new fromChart.LoadChartsSuccess(result)),
        catchError(error => of(new fromChart.LoadChartsFail()))
      );
    })
  );

  @Effect()
  saveChart$ = this.actions.ofType(fromChart.SAVE_CHART).pipe(
    switchMap((action: fromChart.SaveChart) => {
      return this.chartService.createChart(action.payload).pipe(
        map(result => new fromChart.SaveChartSuccess(result)),
        catchError(error => of(new fromChart.SaveChartFail()))
      );
    })
  );

  @Effect()
  fireAggregationRequest$ = this.actions
    .ofType(fromChart.FIRE_AGGREGATION_REQUEST)
    .pipe(
      mergeMap((k: fromChart.FireAggregationRequest) => {
        return this.searchService.fireAggregation(k.payload).pipe(
          map(response => {
            const reQue = response.map((l, i) => {
              return { response: l, query: k.payload[i] };
            });
            return { [k.id]: reQue };
          }),
          catchError(error => of(new fromChart.FireAggregationRequestFail()))
        );
      }),
      map(
        (k: {
          [id: string]: Array<{
            response: SearchResponse;
            query: AggregationRequestObject;
          }>;
        }) => new fromChart.FireAggregationRequestSuccess(k)
      )
    );

  constructor(
    private actions: Actions,
    private chartService: ChartService,
    private searchService: SearchService
  ) {}
}
