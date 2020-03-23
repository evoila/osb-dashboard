import { createSelector } from '@ngrx/store';
import * as fromQueries from '../reducers/query.reducer';
import { QueriesState, getQueriesState } from '../reducers/index';



export const getAllQueriesState = createSelector(
    getQueriesState,
    (state: QueriesState) => state.queries
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

export const isQueryRunning = createSelector(
   getAllQueriesState,
 fromQueries.getQueryRunning
);

export const getQueryRunResult = createSelector(
  getAllQueriesState,
fromQueries.getQueryRunResult
);


