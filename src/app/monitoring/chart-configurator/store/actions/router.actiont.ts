import { Action } from '@ngrx/store';

export const NAVIGATE_TO_OPTIONS = '[Router] Navigate to Options';

export class NavigateToOptions implements Action {
  readonly type = NAVIGATE_TO_OPTIONS;
  // payload sepecifies the Chart-Type the user has chosen
  constructor(public payload: string) {}
}
