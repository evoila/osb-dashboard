import { Action } from '@ngrx/store';
import { Chart } from '../../../shared/model/chart';
import { CfAuthScope } from '../../../chart-configurator/model/cfAuthScope';

export const ADD_CHART_TO_PANEL = '[Panel Configurator] Add Chart to Panel';
export const DELETE_CHART_IN_PANEL =
  '[Panel Configurator] Delete Chart in Panel';

export const SET_NAME = '[Panel Configurator] Set Name';
export const SET_DESCRIPTION = '[Panel Configurator] Set Description';
export const SET_AUTH_SCOPE = '[Panel Configurator] Set AuthScope';
export const FLUSH_STATE = '[Panel Configurator] Flush State';

export class AddChartToPanel implements Action {
  readonly type = ADD_CHART_TO_PANEL;
  constructor(public payload: Chart) {}
}
export class DeleteChartInPanel implements Action {
  readonly type = DELETE_CHART_IN_PANEL;
  constructor(public payload: string) {}
}
export class SetName implements Action {
  readonly type = SET_NAME;
  constructor(public payload: string) {}
}
export class SetDescription implements Action {
  readonly type = SET_DESCRIPTION;
  constructor(public payload: string) {}
}
export class FlushState implements Action {
  readonly type = FLUSH_STATE;
}
export class SetAuthScope implements Action {
  readonly type = SET_AUTH_SCOPE;
  constructor(public payload: CfAuthScope) {}
}

export type PanelIncreationAction =
  | AddChartToPanel
  | DeleteChartInPanel
  | SetName
  | SetDescription
  | FlushState
  | SetAuthScope;
