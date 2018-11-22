import * as fromOptions from './options.reducer';
import * as fromBindings from './binding.reducer';
import { ActionReducerMap } from '@ngrx/store';

import { createFeatureSelector } from '@ngrx/store';

export interface ChartState {
  options: fromOptions.OptionsState;
  bindings: fromBindings.BindingsState;
}

export const reducers: ActionReducerMap<ChartState> = {
  options: fromOptions.reducer,
  bindings: fromBindings.reducer
};

export const getChartState = createFeatureSelector<ChartState>('charts');
