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
      .reduce<{ [id: string]: AggregationRequestObject }>(
        (prev: any, curr, i, arr) => {
          if (i == 0) {
            return { [curr]: chartIncreation[curr] } as {
              [id: string]: AggregationRequestObject;
            };
          } else {
            return { ...prev, [curr]: chartIncreation[curr] } as {
              [id: string]: AggregationRequestObject;
            };
          }
        },
        {}
      );
  }
);

export const getReadyForRequestAggregationsArray = createSelector(
  getReadyForRequestAggregations,
  readyObjects => {
    return Array.from(
      new Map<string, any>(Object.entries(readyObjects))[Symbol.iterator]()
    ).map(k => k[1]);
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

export const getChartIncreationAggregationState = createSelector(
  getAllChartIncreationState,
  fromChartIncreation.getAggregationsState
);

export const hasError = (state: { [id: string]: string }) => {
  return (
    Array.from(new Map<string, any>(Object.entries(state))[Symbol.iterator]())
      .map(k => k[1])
      .filter(type => type != 'ok').length > 0
  );
};
