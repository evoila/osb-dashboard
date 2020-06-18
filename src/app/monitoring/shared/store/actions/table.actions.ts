import { Action } from '@ngrx/store';
import { Table } from '../../model/table';



export const SAVE_TABLE = '[Table] Save Table';
export const SAVE_TABLE_SUCCESS = '[Table] Save Table Success';
export const SAVE_TABLE_FAIL = '[Table] Save Table Fail';

export const DELETE_TABLE = '[Table] Delete Table';
export const DELETE_TABLE_SUCCESS = '[Table] Delete Table success';
export const DELETE_TABLE_FAIL = '[Table] Delete Table fail';

export const LOAD_TABLES = '[Table] Load Tables';
export const LOAD_TABLES_SUCCESS = '[Table] Load Tables Success';
export const LOAD_TABLES_FAIL = '[Table] Load Tables Failed';



export class SaveTable implements Action {
  readonly type = SAVE_TABLE;
  
  constructor(public payload: Table) { }
}
export class SaveTableSuccess implements Action {
  readonly type = SAVE_TABLE_SUCCESS;
  constructor(public payload: Table) { }
}
export class SaveTableFail implements Action {
  readonly type = SAVE_TABLE_FAIL;
}


export class DeleteTable implements Action {
  readonly type = DELETE_TABLE;
  // payload must be an existing table
  constructor(public payload: Table) { }
}
export class DeleteTableSuccess implements Action {
  readonly type = DELETE_TABLE_SUCCESS;
  constructor(public payload: Table) {} 
}
export class DeleteTableFail implements Action {
  readonly type = DELETE_TABLE_FAIL;
}


export class LoadTables implements Action {
  readonly type = LOAD_TABLES;
}
export class LoadTablesSuccess implements Action {
  readonly type = LOAD_TABLES_SUCCESS;
  constructor(public payload: Array<Table>) { }
}
export class LoadTablesFail implements Action {
  readonly type = LOAD_TABLES_FAIL;
}

export type TableAction =
  | SaveTable
  | SaveTableSuccess
  | SaveTableFail
  | LoadTables
  | LoadTablesSuccess
  | LoadTablesFail
  | DeleteTable
  | DeleteTableFail
  | DeleteTableSuccess;
