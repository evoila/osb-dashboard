import { Injectable, OnInit } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as fromOptionsToolbox from '../actions/options.toolbox.action';
import { Store } from '@ngrx/store';
import { withLatestFrom, switchMap, map } from 'rxjs/operators';
import {
  getChartIncreationOptions,
  getChartIncreationOptionsSet
} from '../selectors/chart.increation.selector';
import { ChartOptionsEntity } from '../../model/chart-options-entity';
import { SetChartOptions } from '../actions/chart.increation.action';

import { of, Observable } from 'rxjs';
import { take } from 'rxjs/internal/operators';
import { ChartIncreationState } from '../reducers/chart.increation.reducer';


@Injectable()
export class OptionsToolboxEffect implements OnInit {
  private latestFromStore = () => {
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

  private returnError = () =>
    of(new fromOptionsToolbox.UpdateOptionsFail('options not Set'));

  /*---- Animations ----*/
  // TODO: Reimplement with latestFromStore Function
  @Effect()
  disabledAnimations$ = this.actions
    .ofType(fromOptionsToolbox.SET_ANIMATION_DISABLED)
    .pipe(
      switchMap(() => {
        return this.store.select(getChartIncreationOptionsSet).pipe(
          take(1),
          switchMap(isSet => {
            return this.store.select(getChartIncreationOptions).pipe(
              take(1),
              switchMap(
                (
                  options
                ): Observable<
                  SetChartOptions | fromOptionsToolbox.UpdateOptionsFail
                > => {
                  if (isSet) {
                    const optionsEntity = {
                      ...options[Object.keys(options)[0]]
                    };
                    const newOptionsState = Object.assign(optionsEntity, {
                      options: { animation: false }
                    } as ChartOptionsEntity);
                    return of(new SetChartOptions(newOptionsState));
                  }
                  return this.returnError();
                }
              )
            );
          })
        );
      })
    );

  @Effect()
  setAnimation$ = this.actions.ofType(fromOptionsToolbox.SET_ANIMATION).pipe(
    map(payload => payload),
    this.latestFromStore(),
    switchMap(
      (
        payload
      ): Observable<SetChartOptions | fromOptionsToolbox.UpdateOptionsFail> => {
        if (payload.isSet) {
          const easing: string = payload.payload.payload;
          const optionsEntity = {
            ...payload.options[Object.keys(payload.options)[0]]
          };
          const newOptionsState = Object.assign(optionsEntity, {
            options: { animation: { easing } }
          } as ChartOptionsEntity);
          return of(new SetChartOptions(newOptionsState));
        }
        return this.returnError();
      }
    )
  );

  /*---- Ledgends ----*/
  @Effect()
  setLedgendDisabled$ = this.actions
    .ofType(fromOptionsToolbox.SET_LEDGEND_DISABLED)
    .pipe(
      this.latestFromStore(),
      switchMap(
        (
          payload
        ): Observable<
          SetChartOptions | fromOptionsToolbox.UpdateOptionsFail
        > => {
          if (payload.isSet) {
            const optionsEntity: ChartOptionsEntity = {
              ...payload.options[Object.keys(payload.options)[0]]
            };
            const newOptionsState = {
              ...optionsEntity,
              options: {
                ...optionsEntity.options,
                ledgend: { ...optionsEntity.options.legend, display: false }
              }
            };
            return of(new SetChartOptions(newOptionsState));
          }
          return this.returnError();
        }
      )
    );

  @Effect()
  setLedgendPosition$ = this.actions
    .ofType(fromOptionsToolbox.SET_LEDGEND_POSITION)
    .pipe(
      this.latestFromStore(),
      switchMap(
        (
          payload
        ): Observable<
          SetChartOptions | fromOptionsToolbox.UpdateOptionsFail
        > => {
          if (payload.isSet) {
            const position: string = payload.payload.payload;
            const optionsEntity: ChartOptionsEntity = {
              ...payload.options[Object.keys(payload.options)[0]]
            };
            const newOptionsState = {
              ...optionsEntity,
              options: {
                ...optionsEntity.options,
                ledgend: {
                  ...optionsEntity.options.legend,
                  display: true,
                  position
                }
              }
            };
            return of(new SetChartOptions(newOptionsState));
          }
          return this.returnError();
        }
      )
    );
  
  
  @Effect()
  

  constructor(
    private actions: Actions,
    private store: Store<ChartIncreationState>
  ) {}

  ngOnInit() {}
}

