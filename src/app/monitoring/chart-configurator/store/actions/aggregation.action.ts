import { Action } from '@ngrx/store';
import { Aggregation } from '../../model/aggregation';
// Load Aggregation
export const LOAD_AGGREGATIONS = '[Aggregations] Load Aggregations';
export const LOAD_AGGREGATIONS_FAIL = '[Aggregations] Load Aggregations Fail';
export const LOAD_AGGREGATIONS_SUCCESS =
  '[Aggregations] Load Aggregations Success';

// Save Aggregation
export const SAVE_AGGREGATION = '[Aggregations] Save Aggregation';
export const SAVE_AGGREGATION_FAIL = '[Aggregations] Save Aggregation Fail';
export const SAVE_AGGREGATION_SUCCESS =
  '[Aggregations] Save Aggregation Success';

// Update Aggregation to in MVP-2

/*
 *
 */

// Load Aggregation
export class LoadAggregations implements Action {
  readonly type = LOAD_AGGREGATIONS;
  // Chart Type needs to be specified
  constructor(public payload: string) {}
}

export class LoadAggregationsFail implements Action {
  readonly type = LOAD_AGGREGATIONS_FAIL;
}

export class LoadAggregationsSuccess implements Action {
  readonly type = LOAD_AGGREGATIONS_SUCCESS;
  constructor(public payload: Array<Aggregation>) {}
}

export type AggregationLoadAction =
  | LoadAggregations
  | LoadAggregationsFail
  | LoadAggregationsSuccess;

// Save Aggregation
export class SaveAggregation implements Action {
  readonly type = SAVE_AGGREGATION;
  constructor(public payload: Aggregation) {}
}
export class SaveAggregationSuccess implements Action {
  readonly type = SAVE_AGGREGATION_SUCCESS;
  constructor(public payload: Aggregation) {}
}
export class SaveAggregationFail implements Action {
  readonly type = SAVE_AGGREGATION_FAIL;
}
export type AggregationSaveAction =
  | SaveAggregation
  | SaveAggregationFail
  | SaveAggregationSuccess;

// Final Type Export
export type AggregationAction = AggregationLoadAction | AggregationSaveAction;
