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

// Delete Agrgegation 
export const DELETE_AGGREGATION = '[Aggregations] Delete Aggregation';
export const DELETE_AGGREGATION_FAIL = '[Aggregations] Delete Aggregation Fail';
export const DELETE_AGGREGATION_SUCCESS =
  '[Aggregations] Delete Aggregation Success';

// UPDATE Agrgegation 
export const UPDATE_AGGREGATION = '[Aggregations] UPDATE Aggregation';
export const UPDATE_AGGREGATION_FAIL = '[Aggregations] UPDATE Aggregation Fail';
export const UPDATE_AGGREGATION_SUCCESS =
  '[Aggregations] UPDATE Aggregation Success';


/*
 *
 */

// Load Aggregation
export class LoadAggregations implements Action {
  readonly type = LOAD_AGGREGATIONS;
  // Chart Type needs to be specified
  constructor(public payload: string) { }
}

export class LoadAggregationsFail implements Action {
  readonly type = LOAD_AGGREGATIONS_FAIL;
}

export class LoadAggregationsSuccess implements Action {
  readonly type = LOAD_AGGREGATIONS_SUCCESS;
  constructor(public payload: Array<Aggregation>) { }
}

export type AggregationLoadAction =
  | LoadAggregations
  | LoadAggregationsFail
  | LoadAggregationsSuccess;

// Save Aggregation
export class SaveAggregation implements Action {
  readonly type = SAVE_AGGREGATION;
  constructor(public payload: Aggregation) { }
}
export class SaveAggregationSuccess implements Action {
  readonly type = SAVE_AGGREGATION_SUCCESS;
  constructor(public payload: Aggregation) { }
}
export class SaveAggregationFail implements Action {
  readonly type = SAVE_AGGREGATION_FAIL;
}
export type AggregationSaveAction =
  | SaveAggregation
  | SaveAggregationFail
  | SaveAggregationSuccess;

// Update Aggregation
export class UpdateAggregation implements Action {
  readonly type = UPDATE_AGGREGATION;
  constructor(public payload: Aggregation) { }
}
export class UpdateAggregationSuccess implements Action {
  readonly type = UPDATE_AGGREGATION_SUCCESS;
  constructor(public payload: Aggregation) { }
}
export class UpdateAggregationFail implements Action {
  readonly type = UPDATE_AGGREGATION_FAIL;
}
export type AggregationUpdateAction =
  | UpdateAggregation
  | UpdateAggregationFail
  | UpdateAggregationSuccess;

// Delete Aggregation
export class DeleteAggregation implements Action {
  readonly type = DELETE_AGGREGATION;
  constructor(public payload: Aggregation) { }
}
export class DeleteAggregationSuccess implements Action {
  readonly type = DELETE_AGGREGATION_SUCCESS;
  constructor(public payload: Aggregation) { }
}
export class DeleteAggregationFail implements Action {
  readonly type = DELETE_AGGREGATION_FAIL;
}

export type AggregationDeleteAction =
  | DeleteAggregation
  | DeleteAggregationFail
  | DeleteAggregationSuccess;

// Final Type Export
export type AggregationAction = AggregationLoadAction
  | AggregationSaveAction
  | AggregationDeleteAction
  | AggregationUpdateAction;
