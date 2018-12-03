import * as fromOptions from './options.reducer';
import * as fromBindings from './binding.reducer';
import * as fromChartIncreation from './chart.increation.reducer';
import { ActionReducerMap } from '@ngrx/store';

import { createFeatureSelector } from '@ngrx/store';

export interface ChartState {
  options: fromOptions.OptionsState;
  bindings: fromBindings.BindingsState;
  chartIncreation: fromChartIncreation.ChartIncreationState;
}

export const reducers: ActionReducerMap<ChartState> = {
  options: fromOptions.reducer,
  bindings: fromBindings.reducer,
  chartIncreation: fromChartIncreation.reducer
};

export const getChartState = createFeatureSelector<ChartState>('charts');
