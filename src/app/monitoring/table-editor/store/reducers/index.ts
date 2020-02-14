import * as fromQueries from './query.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface SharedModuleState {
  queries: fromQueries.GetESQueriesState;
}

export const reducers: ActionReducerMap<SharedModuleState> = {
  queries: fromQueries.reducer
};

export const getSharedModuleState = createFeatureSelector<SharedModuleState>(
  'sharedmodule'
);