import { createSelector } from '@ngrx/store';
import { getPanelState, PanelConfiguratorState } from '../reducers/index';
import {
  getCharts,
  PanelIncreationState
} from '../reducers/panel-increation.reducer';
import { Panel } from '../../../shared/model/panel';
import { Chart } from '../../../shared/model/chart';
import { ChartInPanel } from '../../../model/chart-in-panel';

export const getPanelIncreationState = createSelector(
  getPanelState,
  (state: PanelConfiguratorState) => state.panelIncreation
);

export const getPanelIncreationCharts = createSelector(
  getPanelIncreationState,
  getCharts
);

export const buildFunctionalPanel = createSelector<
  PanelIncreationState,
  PanelIncreationState,
  Panel
>(
  getPanelIncreationState,
  (state: PanelIncreationState) => {
    const charts = constructChartInPanel(deconstructCharts(state.charts));
    return {
      authScope: state.authScope,
      charts,
      name: state.name,
      description: state.description
    } as Panel;
  }
);

export const panelReadyForBuild = createSelector(
  getPanelIncreationState,
  state =>
    state.authScope.orgId &&
    state.authScope.spaceId &&
    state.name &&
    Object.keys(state.charts).length > 0
);
function deconstructCharts(obj: any) {
  return Array.from(new Map(Object.entries(obj))[Symbol.iterator]()).map(
    k => k[1] as Chart
  );
}
function constructChartInPanel(arr: Chart[]) {
  return arr.map((chart, order) => {
    return { order, chart, size: 12 } as ChartInPanel;
  });
}
