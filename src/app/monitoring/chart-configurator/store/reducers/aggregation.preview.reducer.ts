import { Aggregation } from "../../model/aggregation";
import { AggregationRequestObject } from "../../model/aggregationRequestObject";
import * as fromAggregationPreview from '../actions/aggregation.preview.action';

export interface AggregationPreviewState {
    aggregation: Aggregation,
    scopedAggregation: AggregationRequestObject,
    success: boolean,
    loaded: boolean,
    loading: boolean

}

export const initialState: AggregationPreviewState = {
    aggregation: {} as Aggregation,
    scopedAggregation: {} as AggregationRequestObject,
    loaded: false,
    loading: true,
    success: false
}

export function reducer(
    state = initialState,
    action: fromAggregationPreview.AggregationPreview
): AggregationPreviewState {
    switch (action.type) {
        case fromAggregationPreview.SET_AGGREGATION_FOR_PREVIEW: {
            return {
                ...state,
                loaded: false,
                loading: true
            }
        }
        case fromAggregationPreview.SET_AGGREGATION_FOR_PREVIEW_SUCCESS: {
            const { aggregation } = action;
            return {
                ...state,
                aggregation,
                success: true,
                loading: true
            }
        }
        case fromAggregationPreview.SET_AGGREGATION_FOR_PREVIEW_FAILED: {
            return {
                ...state,
                success: false,
                loaded: false,
                loading: false
            }
        }
        case fromAggregationPreview.SET_AGGREGATION_WITH_SCOPE: {
            const { scopedAggregation } = state;
            return {
                ...state,
                scopedAggregation,
                success: false,
                loaded: false,
                loading: true
            }
        }
        case fromAggregationPreview.SET_AGGREGATION_WITH_SCOPE_SUCCESS: {
            const { scopedAggregation } = state;
            return {
                ...state,
                scopedAggregation,
                loaded: true,
                loading: false,
                success: true
            }
        }
        case fromAggregationPreview.SET_AGGREGATION_WITH_SCOPE_FAILED: {
            return {
                ...state,
                loaded: false,
                loading: false,
                success: false
            }
        }
        case fromAggregationPreview.CREATE_AGGREGATION_CANCEL: {
            return {
                ...state,
                loaded: false,
                loading: true,
                success: false
            }
        }
        case fromAggregationPreview.CREATE_AGGREGATION_CANCEL_SUCCESS: {
            return {
                // added to flush the rest of the state
                ...initialState,
                loaded: true,
                loading: false,
                success: true
            }
        }
        case fromAggregationPreview.CREATE_AGGREGATION_CANCEL_FAILED: {
            return {
                ...state,
                loaded: false,
                loading: false,
                success: false
            }
        }
        case fromAggregationPreview.AGGREGATION_PREVIEW_FLUSH: {
            return initialState;
        }
    }
    return state;
}

export const getAggregation = (state: AggregationPreviewState) =>
    state.aggregation
export const getScopedAggregation = (state: AggregationPreviewState) =>
    state.scopedAggregation