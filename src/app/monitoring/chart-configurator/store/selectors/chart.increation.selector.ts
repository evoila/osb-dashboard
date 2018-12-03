import { createSelector } from '@ngrx/store';
import { getChartState, ChartState } from '../reducers/index';
import * as fromChartIncreation from '../reducers/chart.increation.reducer';

export const getAllChartIncreationState = createSelector(
  getChartState,
  (state: ChartState) => state.chartIncreation
);

export const getChartIncreationType = createSelector(
  getAllChartIncreationState,
  fromChartIncreation.getChartIncreationType
);
export const getChartIncreationOptions = createSelector(
  getAllChartIncreationState,
  fromChartIncreation.getChartIncreationOptions
);
export const getChartIncreationOptionsSet = createSelector(
  getAllChartIncreationState,
  fromChartIncreation.getChartIncreationOptionsSet
);
export const getChartIncreationAggregations = createSelector(
  getAllChartIncreationState,
  fromChartIncreation.getChartIncreationAggregations
);
