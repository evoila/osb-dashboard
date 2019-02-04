import { ChartOptionsEntity } from '../../model/chart-options-entity';
import * as fromChartIncreation from '../actions/chart.increation.action';
import { AggregationRequestObject } from '../../model/aggregationRequestObject';
import * as uuid from 'uuid';
import { SearchResponse } from '../../../model/search-response';

export interface ChartIncreationState {
  // Chart Type eg. Line, Bar, etc
  type: string;
  option: ChartOptionsEntity;
  aggregations: { [id: string]: AggregationRequestObject };
  optionsSet: boolean;
  aggregationResponse: Array<SearchResponse>;
  aggregationLoading: boolean;
  aggregationLoaded: boolean;
  // tells which aggregations are working and which not
  aggregationsState: { [id: string]: string };
  chartName: string;
}

export const initialState: ChartIncreationState = {
  type: '',
  option: new ChartOptionsEntity(),
  aggregations: {},
  optionsSet: false,
  aggregationResponse: [],
  aggregationLoading: false,
  aggregationLoaded: false,
  aggregationsState: {},
  chartName: ''
};

export function reducer(
  state = initialState,
  action: fromChartIncreation.ChartIncreationAction
): ChartIncreationState {
  switch (action.type) {
    case fromChartIncreation.SET_CHART_TYPE: {
      const type = action.payload;
      return {
        ...state,
        type
      };
    }
    case fromChartIncreation.SET_CHART_OPTIONS: {
      const option = action.payload;
      return {
        ...state,
        option,
        optionsSet: true
      };
    }
    case fromChartIncreation.SET_CHART_AGGREGATIONS: {
      const aggregations = action.payload;
      return {
        ...state,
        aggregations: { ...state.aggregations, [uuid.v4()]: aggregations }
      };
    }
    case fromChartIncreation.UPDATE_CHART_AGGREGATIONS: {
      const { aggUuid } = action;
      return {
        ...state,
        aggregations: { ...state.aggregations, [aggUuid]: action.payload }
      };
    }
    case fromChartIncreation.DELETE_CHART_AGGREGATIONS: {
      const { aggUuid } = action;
      const aggregations = { ...state.aggregations };
      delete aggregations[aggUuid];

      return {
        ...state,
        aggregations
      };
    }

    case fromChartIncreation.FIRE_AGGREGATIONS_FAILED: {
      return {
        ...state,
        aggregationLoading: false,
        aggregationLoaded: false
      };
    }
    case fromChartIncreation.FIRE_AGGREGATIONS_SUCCESS: {
      return {
        ...state,
        aggregationLoading: false,
        aggregationLoaded: true,
        aggregationResponse: action.payload
      };
    }
    case fromChartIncreation.CHECK_AGGREGATION_RESULT_FINISHED: {
      const aggregationsState = action.payload;
      return {
        ...state,
        aggregationsState
      };
    }
    case fromChartIncreation.FLUSH_STATE: {
      return initialState;
    }
    case fromChartIncreation.SET_CHART_NAME: {
      return {
        ...state,
        chartName: action.payload
      };
    }
  }
  return state;
}

function convertObject(
  options: ChartOptionsEntity
): { [id: string]: ChartOptionsEntity } {
  return {
    [options.id!!]: options
  };
}

export const getChartIncreationType = (state: ChartIncreationState) =>
  state.type;
export const getChartIncreationOptions = (state: ChartIncreationState) =>
  state.option;
export const getChartIncreationAggregations = (state: ChartIncreationState) =>
  state.aggregations;
export const getChartIncreationOptionsSet = (state: ChartIncreationState) =>
  state.optionsSet;
export const getAggregationResponse = (state: ChartIncreationState) =>
  state.aggregationResponse;

export const getAggregationsFiredLoaded = (state: ChartIncreationState) =>
  state.aggregationLoaded;
export const getAggregationsFiredLoading = (state: ChartIncreationState) =>
  state.aggregationLoading;

export const getAggregationsState = (state: ChartIncreationState) =>
  state.aggregationsState;
