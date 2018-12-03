import { Injectable, OnInit } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as fromOptionsToolbox from '../actions/options.toolbox.action';
import {
  ChartIncreationState,
  getChartIncreationOptionsSet
} from '../reducers/chart.increation.reducer';
import { Store } from '@ngrx/store';
import { withLatestFrom, switchMap, catchError, map } from 'rxjs/operators';
import { getChartIncreationOptions } from '../reducers/chart.increation.reducer';
import { ChartOptionsEntity } from '../../model/chart-options-entity';
import { SetChartOptions } from '../actions/chart.increation.action';

import { of, OperatorFunction } from 'rxjs';
import { UpdateOptionsFail } from '../actions/options.toolbox.action';

@Injectable()
export class OptionsToolboxEffect implements OnInit {
  private latestFromStore: () => OperatorFunction<
    {},
    {
      payload: any;
      isSet: boolean;
      options: { [id: string]: ChartOptionsEntity };
    }
  >;
  @Effect()
  disabledAnimations$ = this.actions
    .ofType(fromOptionsToolbox.SET_ANIMATION_DISABLED)
    .pipe(
      withLatestFrom(
        this.store.select(getChartIncreationOptionsSet),
        this.store.select(getChartIncreationOptions),
        (isSet: boolean, options: { [id: string]: ChartOptionsEntity }) => {
          return { isSet, options };
        }
      ),
      switchMap(payload => {
        if (payload.isSet) {
          const newOptionsState = Object.assign(payload.options, {
            options: { options: { animation: false } }
          } as ChartOptionsEntity);
          return of(new SetChartOptions(newOptionsState));
        }
        throw new Error('options not loaded');
      }),
      catchError(error => {
        return of(new fromOptionsToolbox.UpdateOptionsFail(error));
      })
    );

  @Effect()
  setAnimation$ = this.actions.ofType(fromOptionsToolbox.SET_ANIMATION).pipe(
    map(payload => payload),
    this.latestFromStore(),
    switchMap(payload => {
      if (payload.isSet) {
        const easing: string = payload.payload;
        const newOptionsState = Object.assign(payload.options, {
          options: { options: { animation: { easing } } }
        } as ChartOptionsEntity);
        return of(new SetChartOptions(newOptionsState));
      }
      throw new Error('options not loaded');
    }),
    catchError(error => of(new fromOptionsToolbox.UpdateOptionsFail(error)))
  );

  constructor(
    private actions: Actions,
    private store: Store<ChartIncreationState>
  ) {}

  ngOnInit() {
    this.latestFromStore = () => {
      return withLatestFrom(
        this.store.select(getChartIncreationOptionsSet),
        this.store.select(getChartIncreationOptions),
        (
          payload: any,
          isSet: boolean,
          options: { [id: string]: ChartOptionsEntity }
        ) => {
          return { payload, isSet, options };
        }
      );
    };
  }
}
