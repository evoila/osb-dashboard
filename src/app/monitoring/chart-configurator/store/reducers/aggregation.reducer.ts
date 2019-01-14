import { Aggregation } from '../../model/aggregation';
import * as fromActions from '../actions/aggregation.action';

export interface AggregationState {
  entities: Array<Aggregation>;
  loaded: boolean;
  loading: boolean;
  saveing: boolean;
  saved: boolean;
}

export const initialState: AggregationState = {
  entities: [],
  loaded: false,
  loading: false,
  saveing: false,
  saved: false
};

export function reducer(
  state = initialState,
  action: fromActions.AggregationAction
): AggregationState {
  switch (action.type) {
    case fromActions.LOAD_AGGREGATIONS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case fromActions.LOAD_AGGREGATIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        entities: action.payload
      };
    }
    case fromActions.SAVE_AGGREGATION_FAIL: {
      return {
        ...state,
        saveing: false,
        saved: false
      };
    }
    case fromActions.SAVE_AGGREGATION_SUCCESS: {
      const entities = [...state.entities, action.payload];
      return {
        ...state,
        entities,
        saved: true,
        saveing: false
      };
    }
  }
  return state;
}

export const getAggregationsLoading = (state: AggregationState) =>
  state.loading;
export const getAggregationsLoaded = (state: AggregationState) => state.loaded;
export const getAggregationsEntities = (state: AggregationState) =>
  state.entities;

export const getAggregationSaveing = (state: AggregationState) => state.saveing;
export const getAggregationSaved = (state: AggregationState) => state.saved;
