import * as fromQueries from '../actions/query.action';
import { ESQuery } from '../../model/es-query';
import { ESBoolQueryRawResponseMap } from '../../model/es-bool-query-result';

export interface GetESQueriesState {
  entities: Array<ESQuery>;
  loading: boolean;
  loaded: boolean;
  running: boolean;
  // ONLY one result of lastly run bool query
  run_result: ESBoolQueryRawResponseMap | null;
}

export const initialState: GetESQueriesState = {
  entities: [],
  loaded: false,
  loading: false,
  running: false,
  run_result: null
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
        running: true
      };
    }
    case fromQueries.RUN_QUERY_FAIL: {
      return {
        ...state,
        running: false,
        run_result: null

      };
    }
    case fromQueries.RUN_QUERY_SUCCESS: {
      const result = action.payload;
      return {
        ...state,
        run_result: result,
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