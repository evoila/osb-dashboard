import { Action } from '@ngrx/store';
import { ChartOptionsEntity } from '../../model/chart-options-entity';

// Load Options
export const LOAD_OPTIONS = '[Options] Load Options';
export const LOAD_OPTIONS_FAIL = '[Options] Load Options Fail';
export const LOAD_OPTIONS_SUCCESS = '[Options] Load Options Success';

export class LoadOptions implements Action {
  readonly type = LOAD_OPTIONS;
}

export class LoadOptionsFail implements Action {
  readonly type = LOAD_OPTIONS_FAIL;
  constructor(public payload: any) {}
}

export class LoadOptionsSuccess implements Action {
  readonly type = LOAD_OPTIONS_SUCCESS;
  constructor(public payload: Array<ChartOptionsEntity>) {}
}

export type OptionsAction = LoadOptions | LoadOptionsFail | LoadOptionsSuccess;
