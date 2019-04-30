import { Chart } from '../../../shared/model/chart';
import { CfAuthScope } from '../../../chart-configurator/model/cfAuthScope';
import * as fromPanelIncreation from '../actions/panel-increation.action';
import * as uuid from 'uuid';


export interface PanelIncreationState {
  id?: string;
  charts: { [id: string]: Chart };
  name: string;
  description: string;
  authScope: CfAuthScope;
  onEdit: boolean;
}
export const initialState: PanelIncreationState = {
  charts: {},
  name: '',
  description: '',
  authScope: {} as CfAuthScope,
  onEdit: false
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
    case fromPanelIncreation.SET_STATE_FOR_UPDATE: {
      const { id, authScope, charts, name, description } = action.payload
      // deconstruct from ChartsInPanel Datatype to normal Chart Datatype
      const newCharts = charts.map(k => k.chart).reduce<{ [id: string]: Chart }>(
        (prev, curr, index, arr) => {
          if (index == 0) {
            return { [uuid.v4()]: curr }
          }
          return { ...prev, [uuid.v4()]: curr }
        }, {}
      )
      return {
        id,
        authScope,
        charts: newCharts,
        name,
        description,
        onEdit: true
      }
    }
  }
  return state;
}

export const getCharts = (state: PanelIncreationState) => state.charts;
