import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as aggregations from '../actions/aggregation.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AggregationService } from '../../services/aggregation.service';

import { of } from 'rxjs';

@Injectable()
export class AggregationEffect {
  @Effect()
  loadAggregations$ = this.actions.pipe(ofType(aggregations.LOAD_AGGREGATIONS),
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
  saveAggregation$ = this.actions.pipe(ofType(aggregations.SAVE_AGGREGATION),
    switchMap((value: aggregations.SaveAggregation, index) => {
      return this.aggregationService.createAggregation(value.payload).pipe(
        map(
          aggregation => new aggregations.SaveAggregationSuccess(aggregation)
        ),
        catchError(error => of(new aggregations.SaveAggregationFail()))
      );
    })
  );

  @Effect()
  updateAggregation$ = this.actions.pipe(ofType(aggregations.UPDATE_AGGREGATION),
    switchMap((value: aggregations.UpdateAggregation, index) => {
      return this.aggregationService.createAggregation(value.payload).pipe(
        map(
          aggregation => new aggregations.UpdateAggregationSuccess(aggregation)
        ),
        catchError(error => of(new aggregations.UpdateAggregationFail()))
      );
    })
  );

  @Effect()
  deleteAggregation$ = this.actions.pipe(ofType(aggregations.DELETE_AGGREGATION),
    switchMap((value: aggregations.DeleteAggregation) => {
      return this.aggregationService.deleteAggregation(value.payload.id!!).pipe(
        map(aggregation => new aggregations.DeleteAggregationSuccess(aggregation)),
        catchError(error => of(new aggregations.DeleteAggregationFail))
      );
    })
  );

  constructor(
    private aggregationService: AggregationService,
    private actions: Actions
  ) { }
}