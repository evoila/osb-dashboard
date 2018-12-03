import { Injectable } from '@angular/core';
import { NavigateToOptions } from 'app/monitoring/chart-configurator/store';
import * as routerAction from '../actions/router.action';
import * as fromStore from '../index';
import { Store } from '@ngrx/store';
import { OptionsState } from '../reducers/options.reducer';
import { Actions, Effect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router/';

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
  constructor(
    private actions: Actions,
    private store: Store<OptionsState>,
    private router: Router
  ) {}
}
