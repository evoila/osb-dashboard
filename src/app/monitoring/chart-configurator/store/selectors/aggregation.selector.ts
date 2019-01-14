import { createSelector } from '@ngrx/store';
import { getChartState, ChartState } from '../reducers/index';
import * as fromAggregations from '../reducers/aggregation.reducer';
import { Aggregation } from '../../model/aggregation';

export const getAggregationState = createSelector(
  getChartState,
  (state: ChartState) => state.aggregations
);

export const getAllAggregationEntities = createSelector(
  getAggregationState,
  fromAggregations.getAggregationsEntities
);
export const getAllActualAggregations = createSelector(
  getAllAggregationEntities,
  (state: Array<Aggregation>) => state.map(k => k.actualAggregation)
);
export const getAggregationsLoaded = createSelector(
  getAggregationState,
  fromAggregations.getAggregationsLoaded
);
export const getAggregationsLoading = createSelector(
  getAggregationState,
  fromAggregations.getAggregationsLoading
);
export const getAggregationSaveing = createSelector(
  getAggregationState,
  fromAggregations.getAggregationSaveing
);
export const getAggregationSaved = createSelector(
  getAggregationState,
  fromAggregations.getAggregationSaved
);
