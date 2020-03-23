import * as fromQueries from './query.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface QueriesState {
  queries: fromQueries.GetESQueriesState;
}

export const reducers: ActionReducerMap<QueriesState> = {
  queries: fromQueries.reducer
};

export const getQueriesState = createFeatureSelector<QueriesState>(
  'queries'
);

