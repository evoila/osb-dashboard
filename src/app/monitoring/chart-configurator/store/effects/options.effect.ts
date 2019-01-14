import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';

import * as optionActions from '../actions/options.action';
import { map, switchMap, catchError, take } from 'rxjs/internal/operators';
import { OptionsService } from '../../services/options.service';
import { environment } from '../../../../../environments/runtime-environment';

import { OptionsRequestObject } from '../../model/options-request-object';
import {
  LoadOptionsSuccess,
  LoadOptionsFail,
  BindingAction
} from 'app/monitoring/chart-configurator/store';
import { of } from 'rxjs/internal/observable/of';
import { Store } from '@ngrx/store';

import { getBindingsSpaceAndOrg } from '../selectors/bindings.selector';

@Injectable()
export class OptionsEffects {
  // Mocked entitis until Binding Service ist part of the ngrx-Store Concept
  private readonly mockedSpace = 'servicebroker-dev';
  private readonly mockedOrg = 'a6cec6a0-f163-4601-a573-484c9743bfa6';

  private request = {
    serviceInstanceId: environment.serviceInstanceId,
    space: this.mockedSpace,
    org: this.mockedOrg
  } as OptionsRequestObject;

  @Effect()
  loadOptions$ = this.actions.ofType(optionActions.LOAD_OPTIONS).pipe(
    switchMap((chartType: optionActions.LoadOptions) => {
      return this.optionsStore.select(getBindingsSpaceAndOrg).pipe(
        take(1),
        switchMap(bindings => {
          this.request.space = bindings.space;
          this.request.org = bindings.org;

          this.request.chartType = chartType.payload;
          return this.optionService.getOptions(this.request).pipe(
            map(options => new LoadOptionsSuccess(options)),
            catchError(error => of(new LoadOptionsFail(error)))
          );
        }),
        catchError(error => of(new LoadOptionsFail(error)))
      );
    })
  );
  constructor(
    private actions: Actions,
    private optionService: OptionsService,
    private optionsStore: Store<BindingAction>
  ) {}
}
