import { Panel } from '../../model/panel';
import { Action } from '@ngrx/store';

export const LOAD_PANELS = '[Shared Module] Load Panels';
export const LOAD_PANELS_SUCCESS = '[Shared Module] Load Panels Succes';
export const LOAD_PANELS_FAILED = '[Shared Module] Load Panels Failed';

export const SAVE_PANEL = '[Shared Module] Save Panel';
export const SAVE_PANEL_SUCCESS = '[Shared Module] Save Panel Succes';
export const SAVE_PANEL_FAILED = '[Shared Module] Save Panel Failed';

export class LoadPanels implements Action {
  readonly type = LOAD_PANELS;
}
export class LoadPanelsSuccess implements Action {
  readonly type = LOAD_PANELS_SUCCESS;
  constructor(public payload: Array<Panel>) {}
}
export class LoadPanelsFailed implements Action {
  readonly type = LOAD_PANELS_FAILED;
}

export class SavePanel implements Action {
  readonly type = SAVE_PANEL;
  constructor(public payload: Panel) {}
}
export class SavePanelSuccess implements Action {
  readonly type = SAVE_PANEL_SUCCESS;
}
export class SavePanelFailed implements Action {
  readonly type = SAVE_PANEL_FAILED;
}

export type PanelAction =
  | LoadPanels
  | LoadPanelsSuccess
  | LoadPanelsFailed
  | SavePanel
  | SavePanelSuccess
  | SavePanelFailed;
