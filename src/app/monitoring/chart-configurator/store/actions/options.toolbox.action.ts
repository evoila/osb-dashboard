import { Action } from '@ngrx/store';

export const UPDATE_OPTIONS_FAIL = '[Options Toolbox] Update Options Fail';

export class UpdateOptionsFail implements Action {
  readonly type = UPDATE_OPTIONS_FAIL;
  constructor(public payload: string) {}
}
/*
 * Animations actions
 */

export const SET_ANIMATION_DISABLED =
  '[Options Toolbox] Set Animation Disabled';
export const SET_ANIMATION = '[Options Toolbox] Set Animation';

export class SetAnimationDisabled implements Action {
  readonly type = SET_ANIMATION_DISABLED;
}
export class SetAnimation implements Action {
  readonly type = SET_ANIMATION;
  // payload sets the type of animation eg line
  constructor(public payload: String) {}
}

type ToolboxAnimationAction = SetAnimationDisabled | SetAnimation;

/*
 * Ledgend Actions
 */

export const SET_LEDGEND_DISABLED = '[Options Toolbox] Set Ledgend None';
export const SET_LEDGEND_POSITION = '[Options Toolbox] Set Ledgend Position';
export const OPEN_LEDGEND_EXPERT_MODE =
  '[Options Toolbox] OPEN_LEDGEND_EXPERT_MODE';
export const CLOSE_LEDGEND_EXPERT_MODE =
  '[Options Toolbox] CLOSE_LEDGEND_EXPERT_MODE';

export class SetLedgendDisabled implements Action {
  readonly type = SET_LEDGEND_DISABLED;
}
export class SetLedgendPosition implements Action {
  readonly type = SET_LEDGEND_POSITION;
  constructor(public payload: String) {}
}
export class OpenLedgendExpertMode implements Action {
  readonly type = OPEN_LEDGEND_EXPERT_MODE;
}
export class CloseLedgendExpertMode implements Action {
  readonly type = CLOSE_LEDGEND_EXPERT_MODE;
}

type ToolboxLedgendAction =
  | SetLedgendDisabled
  | SetLedgendPosition
  | OpenLedgendExpertMode
  | CloseLedgendExpertMode;

/*
 * Final export
 */
export type OptionsToolboxAction =
  | ToolboxLedgendAction
  | ToolboxAnimationAction;
