import * as fromOptions from './options.reducer';
import * as fromChartIncreation from './chart.increation.reducer';
import * as fromAggregation from './aggregation.reducer';
import { ActionReducerMap } from '@ngrx/store';

import { createFeatureSelector } from '@ngrx/store';

export interface ChartState {
  options: fromOptions.OptionsState;
  chartIncreation: fromChartIncreation.ChartIncreationState;
  aggregations: fromAggregation.AggregationState;
}

export const reducers: ActionReducerMap<ChartState> = {
  options: fromOptions.reducer,
  chartIncreation: fromChartIncreation.reducer,
  aggregations: fromAggregation.reducer
};

export const getChartState = createFeatureSelector<ChartState>('charts');
