import { Action } from '@ngrx/store';
import { ESQuery } from '../../model/es-query';
import { ESBoolQueryRawResponseMap } from '../../model/es-bool-query-result';
import { ServiceBinding } from 'app/monitoring/model/service-binding';
import { ESQuery_Request } from '../../model/es-query-request';



export const SAVE_QUERY = '[Query] Save Query';
export const SAVE_QUERY_SUCCESS = '[Query] Save Query Success';
export const SAVE_QUERY_FAIL = '[Query] Save Query Fail';

export const LOAD_QUERIES = '[Query] Load Queries';
export const LOAD_QUERIES_SUCCESS = '[Query] Load Queries Success';
export const LOAD_QUERIES_FAIL = '[Query] Load Queries Fail';

export const RUN_QUERY = '[Query] Run Queries';
export const RUN_QUERY_SUCCESS = '[Query] Run Queries Success';
export const RUN_QUERY_FAIL = '[Query] Run Queries Fail';



export class SaveQuery implements Action {
  readonly type = SAVE_QUERY;
  constructor(public payload: ESQuery) { }
}
export class SaveQuerySuccess implements Action {
  readonly type = SAVE_QUERY_SUCCESS;
  constructor(public payload: ESQuery) { }
}
export class SaveQueryFail implements Action {
  readonly type = SAVE_QUERY_FAIL;
}


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


export class RunQuery implements Action {
  readonly type = RUN_QUERY;
  constructor(public payload: ESQuery, public scope: ServiceBinding) {}
}
export class RunQuerySuccess implements Action {
  readonly type = RUN_QUERY_SUCCESS;
  constructor(public payload: ESBoolQueryRawResponseMap, public bq_request: ESQuery_Request) {}
}
export class RunQueryFail implements Action {
  readonly type = RUN_QUERY_FAIL;
  constructor(public payload: any) {}
}



export type ESQueryAction =
  | SaveQuery
  | SaveQuerySuccess
  | SaveQueryFail
  | LoadQueries
  | LoadQueriesFail
  | LoadQueriesSuccess
  | RunQuery
  | RunQueryFail
  | RunQuerySuccess;
