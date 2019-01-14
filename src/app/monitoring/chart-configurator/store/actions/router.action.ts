import { Action } from '@ngrx/store';

export const NAVIGATE_TO_OPTIONS = '[Router] Navigate to Options';
export const NAVIGATE_TO_AGGREGATIONS = '[Router] Navigate to Aggregations';

export class NavigateToOptions implements Action {
  readonly type = NAVIGATE_TO_OPTIONS;
  // payload sepecifies the Chart-Type the user has choosen
  constructor(public payload: string) {}
}
export class NavigateToAggregations implements Action {
  readonly type = NAVIGATE_TO_AGGREGATIONS;
}
