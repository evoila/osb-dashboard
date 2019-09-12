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

export const getPanelNameAndDescription = createSelector(
  getPanelIncreationState,
  (state) => {
    return { name: state.name, description: state.description };
  }
)

export const buildFunctionalPanel = createSelector<
  PanelIncreationState,
  PanelIncreationState,
  Panel
>(
  getPanelIncreationState,
  (state: PanelIncreationState) => {
    state.charts;
    const charts = constructChartInPanel(deconstructCharts(state.charts));
    let panel = {
      authScope: state.authScope,
      charts,
      name: state.name,
      description: state.description
    } as Panel;
    panel = state.id ? { ...panel, id: state.id } : panel;
    return panel;
  }
);

export const panelReadyForBuild = createSelector(
  getPanelIncreationState,
  state =>
    state.authScope.orgId &&
    state.authScope.spaceId &&
    !!state.name
);

export const getPanelOnEdit = createSelector(
  getPanelIncreationState,
  state => state.onEdit
);

function deconstructCharts(obj: any): ChartInPanel[] {
  return Array.from(new Map(Object.entries(obj))[Symbol.iterator]()).map(
    k => k[1] as ChartInPanel
  );
}
function constructChartInPanel(arr: ChartInPanel[]) {
  return arr.map((chart, order) => {
    const size = chart.size ? chart.size : 100;
    return { order, chart: chart.chart, size } as ChartInPanel;
  });
}

