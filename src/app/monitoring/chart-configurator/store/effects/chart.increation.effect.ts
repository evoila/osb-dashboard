import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { SearchService } from '../../../shared/services/search.service';
import * as chartIncActions from '../actions/chart.increation.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ChartIncreationEffect {
  @Effect()
  fireAggregationRequest$ = this.actions
    .ofType(chartIncActions.FIRE_AGGREGATIONS)
    .pipe(
      switchMap((k: chartIncActions.FireAggregations) => {
        return this.searchService.fireAggregation(k.payload);
      }),
      map(k => new chartIncActions.FireAggregationSuccess(k)),
      catchError(error => of(new chartIncActions.FireAggregationsFailed()))
    );
  constructor(private actions: Actions, private searchService: SearchService) {}
}
