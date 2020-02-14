import { Action } from '@ngrx/store';
import { ESQuery } from '../../model/es-query';

export const LOAD_QUERIES = '[Configurator] Load Queries';
export const LOAD_QUERIES_SUCCESS = '[Configurator] Load Queries Success';
export const LOAD_QUERIES_FAIL = '[Configurator] Load Queries Fail';

export class LoadQueries implements Action {
  readonly type = LOAD_QUERIES;
}
export class LoadQueriesSuccess implements Action {
  readonly type = LOAD_QUERIES_SUCCESS;
  constructor(public payload: Array<ESQuery>) {}
}
export class LoadQueriesFail implements Action {
  readonly type = LOAD_QUERIES_FAIL;
  constructor(public payload: any) {}
}

export type ESQueryAction =
  | LoadQueries
  | LoadQueriesFail
  | LoadQueriesSuccess;
