import * as fromQueries from '../actions/query.action';
import { ESQuery } from '../../model/es-query';
import { ESBoolQueryRawResponseMap } from '../../model/es-bool-query-result';
import { ESQuery_Request } from '../../model/es-query-request';

export interface GetESQueriesState {
  entities: Array<ESQuery>;
  loading: boolean;
  loaded: boolean;
  running: boolean;
  // ONLY one result of lastly run bool query
  run_result: ESBoolQueryRawResponseMap | null;
  bc_request: ESQuery_Request | null;
  
}

export const initialState: GetESQueriesState = {
  entities: [],
  loaded: false,
  loading: false,
  running: false,
  run_result: null,
  bc_request: null
};

export function reducer(
  state = initialState,
  action: fromQueries.ESQueryAction
): GetESQueriesState {
  switch (action.type) {
    case fromQueries.LOAD_QUERIES: {
      return {
        ...state,
        loading: true
      };
    }
    case fromQueries.LOAD_QUERIES_SUCCESS: {
      const entities = action.payload;
      return {
        ...state,
        entities: entities,
        loading: false,
        loaded: true
      };
    }
    case fromQueries.LOAD_QUERIES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case fromQueries.RUN_QUERY: {
      return {
        ...state,
        running: true,
        run_result: null,
        bc_request: null
      };
    }
    case fromQueries.RUN_QUERY_FAIL: {
      return {
        ...state,
        running: false,
        run_result: null,
        bc_request: null
      };
    }
    case fromQueries.RUN_QUERY_SUCCESS: {
      var result = action.payload;
      var request = action.bq_request;
      return {
        ...state,
        run_result: result,
        bc_request: request,
        running: false
      };
    }
  }
  return state;
}

export const getQueriesLoading = (state: GetESQueriesState) => state.loading;
export const getQueriesLoaded = (state: GetESQueriesState) => state.loaded;
export const getQueriesEntities = (state: GetESQueriesState) => state.entities;
export const getQueryRunning = (state: GetESQueriesState) => state.running;
export const getQueryRunResult = (state: GetESQueriesState) => state.run_result;