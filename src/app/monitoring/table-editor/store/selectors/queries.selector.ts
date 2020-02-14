import { createSelector } from '@ngrx/store';
import * as fromQueries from '../reducers/query.reducer';
import { SharedModuleState, getSharedModuleState } from '../reducers/index';



export const getAllQueriesState = createSelector(
    getSharedModuleState,
    (state: SharedModuleState) => state.queries
);


export const getAllQueriesEntities = createSelector(
    getAllQueriesState,
  fromQueries.getQueriesEntities
);

export const getAllQueriesLoaded = createSelector(
    getAllQueriesState,
  fromQueries.getQueriesLoaded
);

export const getAllQueriesLoading = createSelector(
    getAllQueriesState,
  fromQueries.getQueriesLoading
);

