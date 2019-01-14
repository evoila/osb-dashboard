import { createSelector } from '@ngrx/store';
import { getChartState, ChartState } from '../reducers/index';
import * as fromChartIncreation from '../reducers/chart.increation.reducer';
import { AggregationRequestObject } from '../../model/aggregationRequestObject';

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

export const getReadyForRequestAggregations = createSelector(
  getAllChartIncreationState,
  chartIncreationState => {
    const chartIncreation = chartIncreationState.aggregations;
    return Object.keys(chartIncreation)
      .filter(id => chartIncreation[id].appId)
      .map(id => chartIncreation[id] as AggregationRequestObject);
  }
);

export const getReadyForRequestAggregationsId = createSelector(
  getAllChartIncreationState,
  chartIncreationState => {
    const chartIncreation = chartIncreationState.aggregations;
    return Object.keys(chartIncreation)
      .filter(id => chartIncreation[id].appId)
      .map(id => id as string) as Array<string>;
  }
);
export const getChartIncreationAggregationResponse = createSelector(
  getAllChartIncreationState,
  fromChartIncreation.getAggregationResponse
);
export const getChartIncreationAggregationResponseLoading = createSelector(
  getAllChartIncreationState,
  fromChartIncreation.getAggregationsFiredLoading
);
export const getChartIncreationAggregationResponseLoaded = createSelector(
  getAllChartIncreationState,
  fromChartIncreation.getAggregationsFiredLoaded
);
