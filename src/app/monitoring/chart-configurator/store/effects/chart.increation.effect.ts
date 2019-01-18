import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { SearchService } from '../../../shared/services/search.service';
import * as chartIncActions from '../actions/chart.increation.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AggregationRequestObject } from '../../model/aggregationRequestObject';
import { Store } from '@ngrx/store';
import {
  CheckAggregationResult,
  CheckAggregationResultFinished
} from '../actions/chart.increation.action';
import { query } from '@angular/animations';

@Injectable()
export class ChartIncreationEffect {
  @Effect()
  fireAggregationRequest$ = this.actions
    .ofType(chartIncActions.FIRE_AGGREGATIONS)
    .pipe(
      switchMap((k: chartIncActions.FireAggregations) => {
        return this.searchService
          .fireAggregation(this.objToAray(k.payload, false))
          .pipe(
            map(response => {
              return { response, query: k.payload };
            })
          );
      }),
      map(k => {
        this.store.dispatch(new CheckAggregationResult(k.query, k.response));
        return new chartIncActions.FireAggregationSuccess(k.response);
      }),
      catchError(error => of(new chartIncActions.FireAggregationsFailed()))
    );

  @Effect()
  checkAggregationResult$ = this.actions
    .ofType(chartIncActions.CHECK_AGGREGATION_RESULT)
    .pipe(
      map((aggRes: CheckAggregationResult) => {
        const returnValue = this.objToAray(aggRes.request, true)
          .map((k, index) => {
            const res = aggRes.response[index];
            if (res['error']) {
              return {
                [k[0]]: 'error'
              };
            } else if (
              res['aggregations'][Object.keys(res['aggregations'])[0]][
                'buckets'
              ].length == 0
            ) {
              return {
                [k[0]]: 'empty'
              };
            } else {
              return {
                [k[0]]: 'ok'
              };
            }
          })
          .reduce((prev, curr, i) => {
            if (i == 0) {
              return curr;
            }
            return { ...prev, ...curr };
          });
        return new chartIncActions.CheckAggregationResultFinished(returnValue);
      })
    );

  constructor(
    private actions: Actions,
    private searchService: SearchService,
    private store: Store<chartIncActions.ChartIncreationAction>
  ) {}

  private objToAray(
    obj: { [id: string]: AggregationRequestObject },
    all: boolean
  ) {
    const returnVal = Array.from(
      new Map<string, any>(Object.entries(obj))[Symbol.iterator]()
    );
    if (!all) {
      return returnVal.map(k => k[1]);
    } else {
      return returnVal;
    }
  }
}
