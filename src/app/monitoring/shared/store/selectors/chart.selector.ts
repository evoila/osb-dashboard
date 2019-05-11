import { createSelector } from '@ngrx/store';
import { SharedModuleState, getSharedModuleState } from '../reducers/index';
import * as fromChartReducer from '../reducers/chart.reducer';
import { Chart as ChartModel } from '../../../model/chart';

export const getChartModelState = createSelector(
  getSharedModuleState,
  (state: SharedModuleState) => state.charts
);
export const getCharts = createSelector(
  getChartModelState,
  fromChartReducer.getCharts
);

export const getChartsLoaded = createSelector(
  getChartModelState,
  fromChartReducer.getChartsLoaded
);

export const getChartsLoading = createSelector(
  getChartModelState,
  fromChartReducer.getChartsLoading
);

export const getChartSaveing = createSelector(
  getChartModelState,
  fromChartReducer.getChartSaveing
);

export const getChartSaved = createSelector(
  getChartModelState,
  fromChartReducer.getChartSaved
);
export const getAggregationResponseAndLoaded = createSelector(
  getChartModelState,
  fromChartReducer.getAggregationResponseAndLoaded
);

export const getAggregationResponseAndLoadedById = createSelector(
  getAggregationResponseAndLoaded,
  (state, id) => {
    if (state && state['results'] && state['results'][id]) {
      return {
        results: state['results'][id],
        loaded: state.loaded,
        loading: state.loading
      };
    }
  }
);
