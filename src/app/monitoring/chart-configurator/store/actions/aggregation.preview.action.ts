import { Action } from "@ngrx/store";
import { Aggregation } from "../../model/aggregation";
import { AggregationRequestObject } from "../../model/aggregationRequestObject";

export const SET_AGGREGATION_FOR_PREVIEW = '[agg_preview] set Aggregation for preview';
export const SET_AGGREGATION_FOR_PREVIEW_SUCCESS = '[agg_preview] set Aggregation for preview success';
export const SET_AGGREGATION_FOR_PREVIEW_FAILED = '[agg_preview] set Aggregation for preview failed';

export const SET_AGGREGATION_WITH_SCOPE = '[agg_preview] set scope for Aggregation for preview';
export const SET_AGGREGATION_WITH_SCOPE_SUCCESS = '[agg_preview] set scope for Aggregation for preview success';
export const SET_AGGREGATION_WITH_SCOPE_FAILED = '[agg_preview] set scope for Aggregation for preview failed';

export const CREATE_AGGREGATION_CANCEL = '[agg_preview] creation of aggregation is being canceld. Delete every database entry';
export const CREATE_AGGREGATION_CANCEL_SUCCESS = '[agg_preview] creation of aggregation is being canceld. Delete every database entry success';
export const CREATE_AGGREGATION_CANCEL_FAILED = '[agg_preview] creation of aggregation is being canceld. Delete every database entry failed';

export const AGGREGATION_PREVIEW_FLUSH = '[agg_preview] flush the state of the aggregation preview';

export class SetAggregationForPreview implements Action {
    readonly type = SET_AGGREGATION_FOR_PREVIEW;
    constructor(public aggregation: Aggregation) { }
}
export class SetAggregationForPreviewSuccess implements Action {
    readonly type = SET_AGGREGATION_FOR_PREVIEW_SUCCESS;
    constructor(public aggregation: Aggregation) { }
}
export class SetAggregationForPreviewFailed implements Action {
    readonly type = SET_AGGREGATION_FOR_PREVIEW_FAILED;
}

export class SetAggregationWithScope implements Action {
    readonly type = SET_AGGREGATION_WITH_SCOPE;
    constructor(public scopedAggregation: AggregationRequestObject) { }
}
export class SetAggregationWithScopeSuccess implements Action {
    readonly type = SET_AGGREGATION_WITH_SCOPE_SUCCESS;
    constructor(public scopedAggregation: AggregationRequestObject) { }
}
export class SetAggregationWithScopeFailed implements Action {
    readonly type = SET_AGGREGATION_WITH_SCOPE_FAILED;
}

export class CreateAggregationCancel implements Action {
    readonly type = CREATE_AGGREGATION_CANCEL;
    constructor(public aggregation: Aggregation) { }
}
export class CreateAggregationCancelSuccess implements Action {
    readonly type = CREATE_AGGREGATION_CANCEL_SUCCESS;
    constructor(public aggregation: Aggregation) { }
}
export class CreateAggregationCancelFailed implements Action {
    readonly type = CREATE_AGGREGATION_CANCEL_FAILED;
}

export class AggregationPreviewFlush implements Action {
    readonly type = AGGREGATION_PREVIEW_FLUSH;
}

export type AggregationPreview =
    SetAggregationForPreview
    | SetAggregationForPreviewSuccess
    | SetAggregationForPreviewFailed
    | SetAggregationWithScope
    | SetAggregationWithScopeSuccess
    | SetAggregationWithScopeFailed
    | CreateAggregationCancel
    | CreateAggregationCancelSuccess
    | CreateAggregationCancelFailed
    | AggregationPreviewFlush;
