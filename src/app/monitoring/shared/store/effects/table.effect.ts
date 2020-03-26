import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as fromTable from '../actions/table.actions';
import { TableService } from '../../services/table.service';

import { switchMap, map, catchError} from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class TableEffect {
  @Effect()
  loadTables$ = this.actions.ofType(fromTable.LOAD_TABLES).pipe(
    switchMap(action => {
      return this.tableService.getAllTables().pipe(
        map(result => new fromTable.LoadTablesSuccess(result)),
        catchError(error => of(new fromTable.LoadTablesFail()))
      );
    })
  );

  @Effect()
  saveTable$ = this.actions.ofType(fromTable.SAVE_TABLE).pipe(
    switchMap((action: fromTable.SaveTable) => {
      return this.tableService.createTable(action.payload).pipe(
        map(result => new fromTable.SaveTableSuccess(result)),
        catchError(error => of(new fromTable.SaveTableFail()))
      );
    })
  );

  @Effect()
  deleteTable$ = this.actions.ofType(fromTable.DELETE_TABLE).pipe(
    switchMap((action: fromTable.DeleteTable) => {
      return this.tableService.deleteTable(action.payload).pipe(
        map(result => new fromTable.DeleteTableSuccess(result)),
        catchError(error => of(new fromTable.DeleteTableFail()))
      );
    })
  )
 

  constructor(
    private actions: Actions,
    private tableService: TableService,
  ) { }
}
