import { Injectable } from '@angular/core';
import { ESQueryService } from '../../../shared/services/es-query.service';
import { Actions, Effect } from '@ngrx/effects';
import * as queryAction from '../actions/query.action';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { catchError, map } from 'rxjs/internal/operators';
import { of } from 'rxjs';
import { LoadQueriesFail } from '../actions/query.action';

@Injectable()
export class ESQueriesEffect {
  @Effect()
  loadBindings$ = this.actions.ofType(queryAction.LOAD_QUERIES).pipe(
    switchMap(() => {
      return this.esQueryService.getESQueries().pipe(
        map(queries => new queryAction.LoadQueriesSuccess(queries!!)),
        catchError(error => of(new LoadQueriesFail(error)))
      );
    })
  );
  constructor(
    private actions: Actions,
    private esQueryService: ESQueryService
  ) {}
}