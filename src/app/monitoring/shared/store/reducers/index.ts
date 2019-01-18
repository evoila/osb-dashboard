import * as fromChart from './chart.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromBindings from './binding.reducer';
import * as fromPanel from './panel.reducer';

export interface SharedModuleState {
  charts: fromChart.ChartModelState;
  bindings: fromBindings.BindingsState;
  panels: fromPanel.PanelState;
}

export const reducers: ActionReducerMap<SharedModuleState> = {
  charts: fromChart.reducer,
  bindings: fromBindings.reducer,
  panels: fromPanel.reducer
};

export const getSharedModuleState = createFeatureSelector<SharedModuleState>(
  'sharedmodule'
);
