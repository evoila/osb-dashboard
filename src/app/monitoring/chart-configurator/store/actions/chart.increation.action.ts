import { Action } from '@ngrx/store';
import { ChartOptionsEntity } from '../../model/chart-options-entity';
import { AggregationRequestObject } from '../../model/aggregationRequestObject';
import { SearchResponse } from '../../../model/search-response';
import { Aggregation } from '../../model/aggregation';

export const SET_CHART_TYPE = '[Increation] Set Chart Type';
export const SET_CHART_OPTIONS = '[Increation] Set Chart Options';

export const SET_CHART_AGGREGATIONS = '[Increation] Set Chart Aggregations';
export const UPDATE_CHART_AGGREGATIONS =
  '[Increation] Update Chart Aggregations';
export const DELETE_CHART_AGGREGATIONS =
  '[Increation] Delete Chart Aggregations';

export const EDIT_AGGREGATION = '[Increation] Edit Aggregation'

export const EDIT_AGGREGATION_SUCCESS = '[Increation] Edit Aggregation Success'
export const EDIT_AGGREGATION_CANCELED = '[Increation] Edit Aggregation Canceled'

export const FIRE_AGGREGATIONS = '[Increation] Fire Aggregation';
export const FIRE_AGGREGATIONS_SUCCESS =
  '[Increation] Fire Aggregation Success';
export const FIRE_AGGREGATIONS_FAILED = '[Increation] Fire Aggregation Failed';

export const CHECK_AGGREGATION_RESULT = '[Increation] Check Aggregation Result';
export const CHECK_AGGREGATION_RESULT_FINISHED =
  '[Increation] Check AggregationResult finished';

export const FLUSH_STATE = '[Increation] Flush State';

export const SET_CHART_NAME = '[Increation] Set Appname';


export class SetChartType implements Action {
  readonly type = SET_CHART_TYPE;
  constructor(public payload: string) { }
}
export class SetChartOptions implements Action {
  readonly type = SET_CHART_OPTIONS;
  constructor(public payload: ChartOptionsEntity) { }
}
export class SetChartAggregations implements Action {
  readonly type = SET_CHART_AGGREGATIONS;
  constructor(public payload: AggregationRequestObject, public id: string) { }
}
export class UpdateChartAggregations implements Action {
  readonly type = UPDATE_CHART_AGGREGATIONS;
  constructor(
    public payload: AggregationRequestObject,
    public aggUuid: string
  ) { }
}
export class DeleteChartAggregations implements Action {
  readonly type = DELETE_CHART_AGGREGATIONS;
  constructor(public aggUuid: string) { }
}

export class FireAggregations implements Action {
  readonly type = FIRE_AGGREGATIONS;
  constructor(public payload: { [id: string]: AggregationRequestObject }) { }
}

export class FireAggregationsFailed implements Action {
  readonly type = FIRE_AGGREGATIONS_FAILED;
}

export class FireAggregationSuccess implements Action {
  readonly type = FIRE_AGGREGATIONS_SUCCESS;
  constructor(public payload: Array<SearchResponse>) { }
}

export class CheckAggregationResult implements Action {
  readonly type = CHECK_AGGREGATION_RESULT;
  constructor(
    public request: { [id: string]: AggregationRequestObject },
    public response: Array<SearchResponse>
  ) { }
}
export class CheckAggregationResultFinished implements Action {
  readonly type = CHECK_AGGREGATION_RESULT_FINISHED;
  constructor(public payload: { [id: string]: string }) { }
}
export class FlushState implements Action {
  readonly type = FLUSH_STATE;
}
export class SetChartName implements Action {
  readonly type = SET_CHART_NAME;
  constructor(public payload: string) { }
}

export class EditAggregation implements Action {
  readonly type = EDIT_AGGREGATION;
  constructor(public payload: Aggregation, public id: string) { }
}

export class EditAggregationSuccess implements Action {
  readonly type = EDIT_AGGREGATION_SUCCESS;
  constructor(public payload: Aggregation) { }
}

export class EditAggregationCanceled implements Action {
  readonly type = EDIT_AGGREGATION_CANCELED;
}

export type FireTypes =
  | FireAggregations
  | FireAggregationSuccess
  | FireAggregationsFailed
  | CheckAggregationResult
  | CheckAggregationResultFinished
  | FlushState;

export type ChartIncreationAction =
  | SetChartType
  | SetChartOptions
  | SetChartName
  | SetChartAggregations
  | UpdateChartAggregations
  | DeleteChartAggregations
  | FireTypes
  | EditAggregation
  | EditAggregationSuccess
  | EditAggregationCanceled;
