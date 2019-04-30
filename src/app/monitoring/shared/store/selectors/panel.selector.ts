import { createSelector } from '@ngrx/store';
import { getSharedModuleState, SharedModuleState } from '../reducers/index';
import { getPanels } from '../reducers/panel.reducer';
import { PanelVm } from '../../model/panel.vm';
import { Panel } from '../../model/panel';

export const getPanelState = createSelector(
  getSharedModuleState,
  (state: SharedModuleState) => {
    return state.panels;
  }
);

export const getAllPanels = createSelector(
  getPanelState,
  getPanels
);

export const getPanelById = createSelector(
  getAllPanels,
  (panels: Array<Panel>, id: string) => {
    return panels.filter(k => k.id == id)[0];
  }
);
export const getPanelViewModelById = createSelector(
  getAllPanels,
  (panels, id: string) => {
    const panel = panels.filter(k => k.id == id)[0];
    if (!panel || !panel.charts) {
      return {};
    }
    const charts: Chart[][] = panel.charts.reduce(
      (prev, next, i, arr) => {
        if (i == 0) {
          return [[next]];
        } else {
          // The Max Size per Row ist 12, so we create a new line wenever the line is filled
          const arr = [...prev[prev.length - 1]];
          const size = [...arr].reduce((prev, curr) => (prev += curr.size), 0);
          if (size + next.size > 12) {
            return [...prev, [next]];
          } else {
            return [...prev.splice(prev.length - 2), [...arr, next]];
          }
        }
      },
      [[]]
    );
    return { ...panel, charts } as PanelVm;
  }
);
