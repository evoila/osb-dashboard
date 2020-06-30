import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromChart from '../actions/chart.actions';
import { ChartService } from '../../services/chart.service';
import { switchMap, map, catchError, mergeMap, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { SearchResponse } from '../../../model/search-response';
import { AggregationRequestObject } from '../../../chart-configurator/model/aggregationRequestObject';
import { QueryAndResponse } from '../../model/query-and-response';

@Injectable()
export class ChartEffect {
  @Effect()
  loadCharts$ = this.actions.pipe(ofType(fromChart.LOAD_CHARTS),
    switchMap(action => {
      return this.chartService.getAllCharts().pipe(
        map(result => new fromChart.LoadChartsSuccess(result)),
        catchError(error => of(new fromChart.LoadChartsFail()))
      );
    })
  );


  @Effect()
  saveChart$ = this.actions.pipe(ofType(fromChart.SAVE_CHART),
    switchMap((action: fromChart.SaveChart) => {
      return this.chartService.createChart(action.payload).pipe(
        map(result => new fromChart.SaveChartSuccess(result)),
        catchError(error => of(new fromChart.SaveChartFail()))
      );
    })
  );

  @Effect()
  deleteChart$ = this.actions.pipe(ofType(fromChart.DELETE_CHART),
    switchMap((action: fromChart.DeleteChart) => {
      return this.chartService.deleteChart(action.payload).pipe(
        map(result => new fromChart.DeleteChartSuccess(result)),
        catchError(error => {
          if(error.status === 409) {
            return of(new fromChart.ChartNotDeletable())
          } else {
            return of(new fromChart.SaveChartFail());
          }
          
        })
      );
    })
  )
  @Effect()
  firePanelAggregationRequest$ = this.actions.
    pipe(ofType(fromChart.FIRE_PANEL_AGGREGATION_REQUEST),
      // use concatMap to maintain order
      concatMap((action: fromChart.FirePanelAggregationRequest) => {
        return this.searchService.firePanelAggregation(action.payload, action.range).pipe(
          map((k: { [id: string]: Array<QueryAndResponse> }) => new fromChart.FireAggregationRequestSuccess(k)),
          catchError(error => of(new fromChart.FireAggregationRequestFail()))
        )
      })
    );
  @Effect()
  fireAggregationRequest$ = this.actions
    .pipe(ofType(fromChart.FIRE_AGGREGATION_REQUEST),
      /* Merge Map here to have multiple innersubscription
      we want to fire a huge amount of requests in the same time
      switchMap would ignore all of them except the last */
      mergeMap((k: fromChart.FireAggregationRequest) => {
        return this.searchService.fireAggregation(k.payload).pipe(
          map(response => {
            const reQue = response.map((l, i) => {
              return { response: l, query: k.payload[i] };
            });
            return { [k.id]: reQue };
          }),
          map(
            (k: {
              [id: string]: Array<{
                response: SearchResponse;
                query: AggregationRequestObject;
              }>;
            }) => new fromChart.FireAggregationRequestSuccess(k)
          ),
          catchError(error => of(new fromChart.FireAggregationRequestFail()))
        );
      })
    );

  constructor(
    private actions: Actions,
    private chartService: ChartService,
    private searchService: SearchService
  ) { }
}
