import * as fromChart from './chart.reducer';
import * as fromTable from './table.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromBindings from './binding.reducer';
import * as fromPanel from './panel.reducer';

export interface SharedModuleState {
  charts: fromChart.ChartModelState;
  tables: fromTable.TableModelState;
  bindings: fromBindings.BindingsState;
  panels: fromPanel.PanelState;
}

export const reducers: ActionReducerMap<SharedModuleState> = {
  charts: fromChart.reducer,
  tables: fromTable.reducer,
  bindings: fromBindings.reducer,
  panels: fromPanel.reducer
};

export const getSharedModuleState = createFeatureSelector<SharedModuleState>(
  'sharedmodule'
);
