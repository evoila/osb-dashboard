import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as aggregations from '../actions/aggregation.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AggregationService } from '../../services/aggregation.service';

import { of } from 'rxjs';

@Injectable()
export class AggregationEffect {
  @Effect()
  loadAggregations$ = this.actions.ofType(aggregations.LOAD_AGGREGATIONS).pipe(
    switchMap((value: aggregations.LoadAggregations, index) => {
      return this.aggregationService.getAllAggregations(value.payload).pipe(
        map(
          aggregation => new aggregations.LoadAggregationsSuccess(aggregation)
        ),
        catchError(error => of(new aggregations.LoadAggregationsFail()))
      );
    })
  );

  @Effect()
  saveAggregation$ = this.actions.ofType(aggregations.SAVE_AGGREGATION).pipe(
    switchMap((value: aggregations.SaveAggregation, index) => {
      return this.aggregationService.createAggregation(value.payload).pipe(
        map(
          aggregation => new aggregations.SaveAggregationSuccess(aggregation)
        ),
        catchError(error => of(new aggregations.SaveAggregationFail()))
      );
    })
  );
  constructor(
    private aggregationService: AggregationService,
    private actions: Actions
  ) {}
}
