import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromPanelInCreation from './panel-increation.reducer';

export interface PanelConfiguratorState {
  panelIncreation: fromPanelInCreation.PanelIncreationState;
}

export const reducers: ActionReducerMap<PanelConfiguratorState> = {
  panelIncreation: fromPanelInCreation.reducer
};

export const getPanelState = createFeatureSelector<PanelConfiguratorState>(
  'panel'
);
