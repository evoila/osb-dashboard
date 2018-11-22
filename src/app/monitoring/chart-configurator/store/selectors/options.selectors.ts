import { createSelector } from '@ngrx/store';
import {
  getChartState,
  ChartState
} from 'app/monitoring/chart-configurator/store';

import * as fromOptions from '../reducers/options.reducer';
/*
 * Options State
 */

export const getOptionsState = createSelector(
  getChartState,
  (state: ChartState) => state.options
);

export const getOptionEntities = createSelector(
  getOptionsState,
  fromOptions.getOptionsEntities
);
export const getAllOptions = createSelector(
  getOptionEntities,
  entities => {
    return Object.keys(entities).map(id => entities[id]);
  }
);
export const getAllOptionsLoaded = createSelector(
  getOptionsState,
  fromOptions.getOptionsLoaded
);
export const getAllOptionsLoading = createSelector(
  getOptionsState,
  fromOptions.getOptionsLoading
);
