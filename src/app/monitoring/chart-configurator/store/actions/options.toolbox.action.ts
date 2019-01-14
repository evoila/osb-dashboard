import { Action } from '@ngrx/store';

/*
 * Available Topics for expert Mode
 */

export const TOPIC_ANIMATION = 'Topic Animation';
export const TOPIC_LEDGEND = 'Topic Ledgend';
export const TOPIC_TITLE = 'Topic Title';

export class TopicAnimation {
  readonly type = TOPIC_ANIMATION;
}
export class TopicLedgend {
  readonly type = TOPIC_LEDGEND;
}
export class TopicTitle {
  readonly type = TOPIC_TITLE;
}

export type ExpertModeTopics = TopicAnimation | TopicLedgend | TopicTitle;
/*
 * Generic Actions
 */

export const UPDATE_OPTIONS_FAIL = '[Options Toolbox] Update Options Fail';
export const OPEN_EXPERT_MODE = '[Options Toolbox] Open Title expert-mode';
export const CLOSE_EXPERT_MODE = '[Options Toolbox] Close Title expert-mode';
export class UpdateOptionsFail implements Action {
  readonly type = UPDATE_OPTIONS_FAIL;
  constructor(public payload: string) {}
}
export class OpenExpertMode {
  readonly type = OPEN_EXPERT_MODE;
  constructor(public payload: ExpertModeTopics) {}
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
  constructor(public payload: string) {}
}

type ToolboxAnimationAction = SetAnimationDisabled | SetAnimation;

/*
 * Ledgend Actions
 */

export const SET_LEDGEND_DISABLED = '[Options Toolbox] Set Ledgend None';
export const SET_LEDGEND_POSITION = '[Options Toolbox] Set Ledgend Position';

export class SetLedgendDisabled implements Action {
  readonly type = SET_LEDGEND_DISABLED;
}
export class SetLedgendPosition implements Action {
  readonly type = SET_LEDGEND_POSITION;
  constructor(public payload: string) {}
}

export type ToolboxLedgendAction = SetLedgendDisabled | SetLedgendPosition;

/*
 * Title Actions
 */
export const SET_TITLE_DISABLED = '[Options Toolbox] Set Title Disabled';
export const SET_TITLE_POSITION = '[Options Toolbox] Set Title Position';

export class SetTitleDisabled implements Action {
  readonly type = SET_TITLE_DISABLED;
}

export class SetTitlePosition implements Action {
  readonly type = SET_TITLE_POSITION;
  constructor(public payload: string) {}
}

export type ToolboxTitleAction = SetTitleDisabled | SetTitlePosition;

/*
 * Layout Actions
 */

  export const LAYOUT_SET_PADDING = '[Options Toolbox] Layout Set Padding';

  export class LayoutSetPadding implements Action {
    readonly type = LAYOUT_SET_PADDING;
    constructor(public payload: string | {left:number, right:number, top:number, bottom:number}) {}
  }
  export type ToolboxLayoutAction = LayoutSetPadding;
/*
 * Final export
 */
export type OptionsToolboxAction =
  | ToolboxLedgendAction
  | ToolboxAnimationAction
  | ToolboxTitleAction;
