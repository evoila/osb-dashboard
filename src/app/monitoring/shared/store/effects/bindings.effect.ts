import { Injectable } from '@angular/core';
import { BindingService } from '../../services/binding.service';
import { Actions, Effect } from '@ngrx/effects';
import * as bindingAction from '../actions/binding.action';
import { switchMap } from 'rxjs/internal/operators/switchMap';

import { catchError, map } from 'rxjs/internal/operators';

import { of } from 'rxjs';
import { LoadBindingsFail } from '../actions/binding.action';

@Injectable()
export class BindingsEffect {
  @Effect()
  loadBindings$ = this.actions.ofType(bindingAction.LOAD_BINDINGS).pipe(
    switchMap(() => {
      return this.bindingService.getBindings().pipe(
        map(bindings => new bindingAction.LoadBindingsSuccess(bindings!!)),
        catchError(error => of(new LoadBindingsFail(error)))
      );
    })
  );
  constructor(
    private actions: Actions,
    private bindingService: BindingService
  ) {}
}
