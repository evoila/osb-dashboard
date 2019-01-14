import { Injectable } from '@angular/core';
import { NavigateToOptions } from 'app/monitoring/chart-configurator/store';
import * as routerAction from '../actions/router.action';
import * as fromStore from '../index';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router/';
import { LoadAggregations } from '../actions/aggregation.action';
import {
  ChartIncreationState,
  getChartIncreationType
} from '../reducers/chart.increation.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RouterEffect {
  @Effect()
  navigateToOptions$ = this.actions
    .ofType(routerAction.NAVIGATE_TO_OPTIONS)
    .pipe(
      map((action: NavigateToOptions) => action.payload),
      map(k => {
        this.router.navigate(['monitoring/configurator/options/' + k]);
        return new fromStore.LoadOptions(k);
      })
    );
  @Effect()
  navigateToAggregations$ = this.actions
    .ofType(routerAction.NAVIGATE_TO_AGGREGATIONS)
    .pipe(
      map(k => {
        this.router.navigate(['monitoring/configurator/aggregations']);
      }),
      switchMap(k => {
        return this.store
          .select(getChartIncreationType)
          .pipe(map(type => new LoadAggregations(type)));
      })
    );
  constructor(
    private actions: Actions,
    private router: Router,
    private store: Store<ChartIncreationState>
  ) {}
}
