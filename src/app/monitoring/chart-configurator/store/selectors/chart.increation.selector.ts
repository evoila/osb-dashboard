import { createSelector } from '@ngrx/store';
import { getChartState, ChartState } from '../reducers/index';
import * as fromChartIncreation from '../reducers/chart.increation.reducer';
import { AggregationRequestObject } from '../../model/aggregationRequestObject';
import { ChartIncreationState, getAggregationResponse } from '../reducers/chart.increation.reducer';
import { Chart } from '../../../shared/model/chart';
import { CfAuthScope } from '../../model/cfAuthScope';
import { ChartOptionsEntity } from '../../model/chart-options-entity';

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
  fromChartIncreation.getChartsReadyForRequest
);

export const getAggregationAndResponse = createSelector(
  getAllChartIncreationState,
  (state: ChartIncreationState) => {
    const aggregation = Array.from(
      new Map<string, any>(Object.entries(fromChartIncreation.getChartsReadyForRequest(state)))[Symbol.iterator]()
    ).map(k => k[1]);
    const { aggregationResponse } = state;
    if (aggregation.length == aggregationResponse.length) {
      const returnVal = aggregation.map((k, i) => {
        return { aggregation: k as AggregationRequestObject, response: aggregationResponse[i] }
      })
      return returnVal;
    }
    return [];
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
export const getAggregationOnEdit = createSelector(
  getAllChartIncreationState,
  state => state.aggregationOnEdit
)
export const buildChart = createSelector(
  getAllChartIncreationState,
  (state: ChartIncreationState) => {
    const option: ChartOptionsEntity | {} = state.option;
    if (
      state &&
      state.type &&
      option != {} &&
      state.aggregations &&
      state.chartName != '' &&
      Object.keys(state.aggregations).length > 0 &&
      !hasError(state.aggregationsState) &&
      state.encodedImage
    ) {
      const aggregations = extractArray(state.aggregations);
      return {
        name: state.chartName,
        type: state.type,
        option: state.option,
        aggregations,
        authScope: {} as CfAuthScope,
        encodedImage: state.encodedImage
      } as Chart;
    }
    return {};
  }
);

const extractArray = (aggs: { [id: string]: AggregationRequestObject }) => {
  return Array.from(
    new Map<string, any>(Object.entries(aggs))[Symbol.iterator]()
  ).map(k => k[1]);
};
export const hasError = (state: { [id: string]: string }) => {
  return (
    Array.from(new Map<string, any>(Object.entries(state))[Symbol.iterator]())
      .map(k => k[1])
      .filter(type => type != 'ok').length > 0
  );
};
