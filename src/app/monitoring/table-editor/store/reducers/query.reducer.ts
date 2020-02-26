import * as fromQueries from '../actions/query.action';
import { ESQuery } from '../../model/es-query';
import { RawQuery } from '../../model/raw-query ';

export interface GetESQueriesState {
  entities: Array<ESQuery>;
  loading: boolean;
  loaded: boolean;
}

export const initialState: GetESQueriesState = {
  entities: [],
  loaded: false,
  loading: false
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
      // TODO::: take action payload
      const entities = [new ESQuery(123, 'abc_query', new RawQuery([], [], [], []))]; //action.payload;
      return {
        ...state,
        entities,
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
  }
  return state;
}

export const getQueriesLoading = (state: GetESQueriesState) => state.loading;
export const getQueriesLoaded = (state: GetESQueriesState) => state.loaded;
export const getQueriesEntities = (state: GetESQueriesState) => state.entities;