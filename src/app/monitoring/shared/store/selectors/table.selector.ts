import { createSelector } from '@ngrx/store';
import { SharedModuleState, getSharedModuleState } from '../reducers/index';
import * as fromTableReducer from '../reducers/table.reducer';

export const getTableModelState = createSelector(
  getSharedModuleState,
  (state: SharedModuleState) => state.tables
);
export const getTables = createSelector(
  getTableModelState,
  fromTableReducer.getTables
);
export const getTablesLoaded = createSelector(
  getTableModelState,
  fromTableReducer.getTablesLoaded
);

export const getTablesLoading = createSelector(
  getTableModelState,
  fromTableReducer.getTablesLoading
);

export const getTableSaveing = createSelector(
  getTableModelState,
  fromTableReducer.getTableSaveing
);

export const getTableSaved = createSelector(
  getTableModelState,
  fromTableReducer.getTableSaved
);

export const getSavedTable = createSelector(
  getTableModelState,
  fromTableReducer.getSavedTable
);

export const getTableDeleted = createSelector(
  getTableModelState,
  fromTableReducer.getTableDeleted
);

export const getTableDeleting = createSelector(
  getTableModelState,
  fromTableReducer.getTableDeleting
);

export const getAggregationResponseAndLoaded = createSelector(
  getTableModelState,
  fromTableReducer.getAggregationResponseAndLoaded
);

export const getAggregationResponseAndLoadedById = createSelector(
  getAggregationResponseAndLoaded,
  (state, id) => {
    if (state && state['results'] && state['results'][id]) {
      return {
        results: state['results'][id],
        loaded: state.loaded,
        loading: state.loading
      };
    }
  }
);


