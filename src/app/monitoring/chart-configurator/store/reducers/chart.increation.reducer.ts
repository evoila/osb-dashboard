import { ChartOptionsEntity } from '../../model/chart-options-entity';
import * as fromChartIncreation from '../actions/chart.increation.action';

export interface ChartIncreationState {
  // Chart Type eg. Line, Bar, etc
  type: string;
  options: { [id: string]: ChartOptionsEntity };
  // TODO: implement Datastructure
  aggregations: Array<any>;
  optionsSet: boolean;
}

export const initialState: ChartIncreationState = {
  type: '',
  options: {},
  aggregations: [],
  optionsSet: false
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
      const options = convertObject(action.payload);
      return {
        ...state,
        options,
        optionsSet: true
      };
    }
    case fromChartIncreation.SET_CHART_AGGREGATIONS: {
      const aggregations = action.payload;
      return {
        ...state,
        aggregations
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
  state.options;
export const getChartIncreationAggregations = (state: ChartIncreationState) =>
  state.aggregations;
export const getChartIncreationOptionsSet = (state: ChartIncreationState) =>
  state.optionsSet;
