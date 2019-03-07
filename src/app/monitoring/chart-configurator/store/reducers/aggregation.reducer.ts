import { Aggregation } from '../../model/aggregation';
import * as fromActions from '../actions/aggregation.action';
import { DELETE_AGGREGATION_FAIL } from '../actions/aggregation.action';

export interface AggregationState {
  entities: Array<Aggregation>;
  loaded: boolean;
  loading: boolean;
  saveing: boolean;
  saved: boolean;
  deleting: boolean;
  deleted: boolean;
}

export const initialState: AggregationState = {
  entities: [],
  loaded: false,
  loading: false,
  saveing: false,
  saved: false,
  deleting: false,
  deleted: false
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
    case fromActions.UPDATE_AGGREGATION_FAIL: {
      return {
        ...state,
        saveing: false,
        saved: false
      };
    }
    case fromActions.UPDATE_AGGREGATION_SUCCESS: {
      let entities = [...state.entities.filter(k => k.id != action.payload.id)];
      entities = [...entities, action.payload];
      return {
        ...state,
        entities,
        saved: true,
        saveing: false
      };
    }
    case fromActions.DELETE_AGGREGATION: {
      return {
        ...state,
        deleted: false,
        deleting: true
      }
    }
    case fromActions.DELETE_AGGREGATION_FAIL: {
      return {
        ...state,
        deleted: false,
        deleting: false
      }
    }
    case fromActions.DELETE_AGGREGATION_SUCCESS: {
      const entities = state.entities.filter(k => k.id != action.payload.id);
      return {
        ...state,
        entities,
        deleting: false,
        deleted: true
      }
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
