import { createSelector } from '@ngrx/store';
import { getChartState, ChartState } from '../reducers/index';
import { getAggregation, getScopedAggregation, AggregationPreviewState } from '../reducers/aggregation.preview.reducer';

export const getAggregationPreviewState = createSelector(
    getChartState,
    (state: ChartState) => state.aggregationPreview
)

export const getPreviewAggregation = createSelector(
    getAggregationPreviewState,
    getAggregation
)
export const getScopedPreviewAggregation = createSelector(
    getAggregationPreviewState,
    getScopedAggregation
)
export const getPreviewAggregationStatus = createSelector(
    getAggregationPreviewState,
    (state: AggregationPreviewState) => {
        const { loaded, loading, success } = state;
        return { loaded, loading, success };
    }
)