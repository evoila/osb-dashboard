import { createSelector } from '@ngrx/store';
import * as fromQueries from '../reducers/query.reducer';
import { QueriesState, getQueriesState } from '../reducers/index';
import { ESQuery } from '../../model/es-query';



export const getAllQueriesState = createSelector(
    getQueriesState,
    (state: QueriesState) => state.queries
);

export const getAllQueriesEntities = createSelector(
    getAllQueriesState,
  fromQueries.getQueriesEntities
);

export const getQuerylById = createSelector(
  getAllQueriesEntities,
  (entities: Array<ESQuery>, id: string) => {
    return entities.filter(k => k.id == id)[0];
  }
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


