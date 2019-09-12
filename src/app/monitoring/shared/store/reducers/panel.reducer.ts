import { Panel } from '../../model/panel';
import * as fromPanelAction from '../actions/panel.action';
import { UPDATE_PANEL } from '../actions/panel.action';

export interface PanelState {
  panels: Array<Panel>;
  panelsLoading: boolean;
  panelsLoaded: boolean;
  panelSaveing: boolean;
  panelSaved: boolean;
}
export const initialState: PanelState = {
  panels: [],
  panelsLoading: false,
  panelsLoaded: false,
  panelSaveing: false,
  panelSaved: false
};

export function reducer(
  state = initialState,
  action: fromPanelAction.PanelAction
) {
  switch (action.type) {
    case fromPanelAction.LOAD_PANELS: {
      return {
        ...state,
        panelsLoading: true,
        panelsLoaded: false
      };
    }
    case fromPanelAction.UPDATE_PANEL: {
      // replace panel in array with it's updated version
      const panels = state.panels.map(k => k.id === action.payload.id ? action.payload : k);
      return {
        ...state,
        panelSaveing: true,
        panelSaved: false,
        panels
      };
    }
    case fromPanelAction.LOAD_PANELS_SUCCESS: {
      return {
        ...state,
        panelsLoading: false,
        panelsLoaded: true,
        panels: action.payload
      };
    }
    case fromPanelAction.LOAD_PANELS_FAILED: {
      return {
        ...state,
        panelsLoading: false,
        panelsLoaded: false
      };
    }
    case fromPanelAction.SAVE_PANEL: {
      return {
        ...state,
        panelSaveing: true,
        panelSaved: false
      };
    }
    case fromPanelAction.SAVE_PANEL_SUCCESS: {
      return {
        ...state,
        panelSaved: true,
        panelSaveing: false
      };
    }
    case fromPanelAction.SAVE_PANEL_FAILED: {
      return {
        ...state,
        panelSaved: false,
        panelSaveing: false
      };
    }
  }
  return state;
}

export const getPanelsLoading = (state: PanelState) => state.panelsLoading;
export const getPanels = (state: PanelState) => state.panels;
export const getPanelsLoaded = (state: PanelState) => state.panelsLoaded;
export const getPanelSaveing = (state: PanelState) => state.panelSaveing;
export const getPanelSaved = (state: PanelState) => state.panelSaved;
