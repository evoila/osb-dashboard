import { Chart } from '../../../shared/model/chart';
import { CfAuthScope } from '../../../chart-configurator/model/cfAuthScope';
import * as fromPanelIncreation from '../actions/panel-increation.action';
import * as uuid from 'uuid';

export interface PanelIncreationState {
  charts: { [id: string]: Chart };
  name: string;
  description: string;
  authScope: CfAuthScope;
}
export const initialState: PanelIncreationState = {
  charts: {},
  name: '',
  description: '',
  authScope: {} as CfAuthScope
};

export function reducer(
  state = initialState,
  action: fromPanelIncreation.PanelIncreationAction
) {
  switch (action.type) {
    case fromPanelIncreation.ADD_CHART_TO_PANEL: {
      return {
        ...state,
        charts: { ...state.charts, [uuid.v4()]: action.payload }
      };
    }
    case fromPanelIncreation.DELETE_CHART_IN_PANEL: {
      const charts = { ...state.charts };
      delete charts[action.payload];
      return {
        ...state,
        charts
      };
    }
    case fromPanelIncreation.SET_NAME: {
      return {
        ...state,
        name: action.payload
      };
    }
    case fromPanelIncreation.SET_DESCRIPTION: {
      return {
        ...state,
        description: action.payload
      };
    }
    case fromPanelIncreation.SET_AUTH_SCOPE: {
      return {
        ...state,
        authScope: action.payload
      };
    }
    case fromPanelIncreation.FLUSH_STATE: {
      return initialState;
    }
  }
  return state;
}

export const getCharts = (state: PanelIncreationState) => state.charts;
