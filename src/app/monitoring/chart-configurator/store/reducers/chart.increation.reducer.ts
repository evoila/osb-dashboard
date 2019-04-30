
import { ChartOptionsEntity } from '../../model/chart-options-entity';
import * as fromChartIncreation from '../actions/chart.increation.action';
import { AggregationRequestObject } from '../../model/aggregationRequestObject';
import * as uuid from 'uuid';
import { SearchResponse } from '../../../model/search-response';
import { Aggregation } from '../../model/aggregation';

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
  aggregationOnEdit?: { [id: string]: Aggregation };
  encodedImage?: string;
}

export const initialState: ChartIncreationState = {
  type: '',
  option: {
    "name": "Testchart",
    "public": true,
    "options": {
    },
    "chartTypes": [
      "bar",
      "line"
    ]
  },
  aggregations: {},
  optionsSet: false,
  aggregationResponse: [],
  aggregationLoading: false,
  aggregationLoaded: false,
  aggregationsState: {},
  chartName: '',
  encodedImage: ''
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
      const { id } = action
      return {
        ...state,
        aggregations: { ...state.aggregations, [id]: aggregations }
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
    case fromChartIncreation.EDIT_AGGREGATION: {
      return {
        ...state,
        aggregationOnEdit: { [action.id]: action.payload }
      }
    }
    case fromChartIncreation.EDIT_AGGREGATION_SUCCESS: {
      return {
        ...state,
        aggregationOnEdit: undefined
      }
    }
    case fromChartIncreation.EDIT_AGGREGATION_CANCELED: {
      return {
        ...state,
        aggregationOnEdit: undefined
      }
    }
    case fromChartIncreation.SET_CHART_IMAGE: {
      return {
        ...state,
        encodedImage: action.encodedImage
      }
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


export const getChartsReadyForRequest = (chartIncreationState: ChartIncreationState) => {
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