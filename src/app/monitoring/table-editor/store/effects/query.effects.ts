import { Injectable } from '@angular/core';
import { ESQueryService } from '../../services/es-query.service';
import { Actions, Effect } from '@ngrx/effects';
import * as queryAction from '../actions/query.action';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { catchError, map } from 'rxjs/internal/operators';
import { of } from 'rxjs';
import { SearchService } from 'app/monitoring/shared/services/search.service';

@Injectable()
export class ESQueriesEffect {

  constructor(
    private actions: Actions,
    private esQueryService: ESQueryService,
    private searchService: SearchService
  ) {}


  @Effect()
  loadQueries$ = this.actions.ofType(queryAction.LOAD_QUERIES).pipe(
    switchMap(() => {
      return this.esQueryService.getESQueries().pipe(
        map(queries => new queryAction.LoadQueriesSuccess(queries!!)),
        catchError(error => of(new queryAction.LoadQueriesFail(error)))
      );
    })
  );


  @Effect()
  saveQuery$ = this.actions.ofType(queryAction.SAVE_QUERY).pipe(
    switchMap((action: queryAction.SaveQuery) => {
      return this.esQueryService.createESQuery(action.payload).pipe(
        map(query => new queryAction.SaveQuerySuccess(query!!)),
        catchError(error => of(new queryAction.SaveQueryFail()))
      );
    })
  );


  @Effect()
  runQuery$ = this.actions.ofType(queryAction.RUN_QUERY).pipe(
    switchMap((action: queryAction.RunQuery) => {
      return this.searchService.run(action.payload, action.scope).pipe(
        map(bool_query_result => new queryAction.RunQuerySuccess(bool_query_result!!)),
        catchError(error => of(new queryAction.RunQueryFail(error)))
      );
    })
  );



  
}