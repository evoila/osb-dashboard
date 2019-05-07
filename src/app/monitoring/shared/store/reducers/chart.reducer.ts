import * as fromChartActions from '../actions/chart.actions';
import { Chart } from '../../model/chart';
import { SearchResponse } from '../../../model/search-response';
import { AggregationRequestObject } from '../../../chart-configurator/model/aggregationRequestObject';
import { QueryAndResponse } from '../../model/query-and-response';

export interface ChartModelState {
  charts: Array<Chart>;
  chartsLoaded: boolean;
  chartsLoading: boolean;
  chartSaved: boolean;
  chartSaveing: boolean;
  aggregationResponse: {
    [id: string]: Array<QueryAndResponse>;
  };
  aggregationLoading: boolean;
  aggregationLoaded: boolean;
}
export const initialState: ChartModelState = {
  charts: [],
  chartsLoading: false,
  chartsLoaded: false,
  chartSaved: false,
  chartSaveing: false,
  aggregationResponse: {},
  aggregationLoading: false,
  aggregationLoaded: false
};

export function reducer(
  state = initialState,
  action: fromChartActions.ChartAction
) {
  switch (action.type) {
    case fromChartActions.LOAD_CHARTS: {
      return {
        ...state,
        chartsLoading: true,
        chartsLoaded: false
      };
    }
    case fromChartActions.LOAD_CHARTS_SUCCESS: {
      return {
        ...state,
        charts: action.payload,
        chartsLoading: false,
        chartsLoaded: true
      };
    }
    case fromChartActions.LOAD_CHARTS_FAIL: {
      return {
        ...state,
        chartsLoading: false,
        chartsLoaded: false
      };
    }
    case fromChartActions.SAVE_CHART: {
      return {
        ...state,
        chartSaveing: true,
        chartSaved: false
      };
    }
    case fromChartActions.SAVE_CHART_SUCCESS: {
      return {
        ...state,
        chartSaveing: false,
        chartSaved: true
      };
    }
    case fromChartActions.SAVE_CHART_FAIL: {
      return {
        ...state,
        chartSaveing: false,
        chartSaved: false
      };
    }
    case fromChartActions.FIRE_AGGREGATION_REQUEST: {
      return {
        ...state,
        aggregationLoading: true,
        aggregationLoaded: false
      };
    }
    case fromChartActions.FIRE_PANEL_AGGREGATION_REQUEST: {
      return {
        ...state,
        aggregationLoading: true,
        aggregationLoaded: false
      };
    }
    case fromChartActions.FIRE_AGGREGATION_REQUEST_FAIL: {
      return {
        ...state,
        aggregationLoading: false,
        aggregationLoaded: false
      };
    }
    case fromChartActions.FIRE_AGGREGATION_REQUEST_SUCCESS: {
      return {
        ...state,
        aggregationLoading: false,
        aggregationLoaded: true,
        aggregationResponse: { ...state.aggregationResponse, ...action.payload }
      };
    }
  }
  return state;
}

export const getCharts = (state: ChartModelState) => state.charts;
export const getChartsLoaded = (state: ChartModelState) => state.chartsLoaded;
export const getChartsLoading = (state: ChartModelState) => state.chartsLoading;

export const getChartSaveing = (state: ChartModelState) => state.chartSaveing;
export const getChartSaved = (state: ChartModelState) => state.chartSaved;

export const getAggregationsFiredLoaded = (state: ChartModelState) =>
  state.aggregationLoaded;
export const getAggregationsFiredLoading = (state: ChartModelState) =>
  state.aggregationLoading;
export const getAggregationResponseAndLoaded = (state: ChartModelState) => {
  return {
    loaded: state.aggregationLoaded,
    loading: state.aggregationLoading,
    results: state.aggregationResponse
  };
};
