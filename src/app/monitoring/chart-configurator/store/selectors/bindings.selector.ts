import { createSelector } from '@ngrx/store';
import {
  getChartState,
  ChartState
} from 'app/monitoring/chart-configurator/store';
import * as fromBindings from '../reducers/binding.reducer';
import {
  SpaceAndOrg,
  ServiceBinding
} from 'app/monitoring/model/service-binding';
/*
 * Binding State
 */

export const getAllBindingsState = createSelector(
  getChartState,
  (state: ChartState) => state.bindings
);

export const getAllBindingsEntities = createSelector(
  getAllBindingsState,
  fromBindings.getBindingsEntities
);

export const getAllBindingsLoaded = createSelector(
  getAllBindingsState,
  fromBindings.getBindingsLoaded
);

export const getAllBindingsLoading = createSelector(
  getAllBindingsState,
  fromBindings.getBindingsLoading
);

// Returns a Single State and Org object
export const getBindingsSpaceAndOrg = createSelector(
  getAllBindingsEntities,
  (entities: Array<ServiceBinding>) => {
    return entities
      .map(entity => {
        return {
          org: entity.organization_guid,
          space: entity.space
        } as SpaceAndOrg;
      })
      .reduce(k => k) as SpaceAndOrg;
  }
);
