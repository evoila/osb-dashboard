import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as aggregations from '../actions/aggregation.preview.action';
import { AggregationService } from "../../services/aggregation.service";
import { switchMap, map, catchError, take } from "rxjs/operators";
import { of } from 'rxjs';
import { Store } from "@ngrx/store";
import { AggregationPreviewState } from "../reducers/aggregation.preview.reducer";
import { getPreviewAggregation } from "../selectors";

@Injectable()
export class AggregationPreviewEffect {
    @Effect()
    setAggregationForPreview$ = this.actions.ofType(aggregations.SET_AGGREGATION_FOR_PREVIEW).pipe(
        switchMap((value: aggregations.SetAggregationForPreview) => {
            return this.store.select(getPreviewAggregation).pipe(
                take(1),
                switchMap(previewAgg => {
                    if (previewAgg.id) {
                        // delete old entry vom db if there is a new one incoming
                        this.store.dispatch(new aggregations.CreateAggregationCancel(previewAgg));
                    }
                    return this.aggregationService.createAggregation(value.aggregation).pipe(
                        map(
                            aggregation => new aggregations.SetAggregationForPreviewSuccess(aggregation)
                        ),
                        catchError(error => of(new aggregations.SetAggregationForPreviewFailed()))
                    )
                })
            )

        })
    );
    @Effect()
    createAggregationCancel$ = this.actions.ofType(aggregations.CREATE_AGGREGATION_CANCEL).pipe(
        switchMap((value: aggregations.CreateAggregationCancel) => {
            return this.aggregationService.deleteAggregation(value.aggregation.id!!).pipe(
                map(
                    aggregation => new aggregations.CreateAggregationCancelSuccess(aggregation)
                ),
                catchError(error => of(new aggregations.CreateAggregationCancelFailed()))
            )
        })
    );
    constructor(
        private aggregationService: AggregationService,
        private actions: Actions,
        private store: Store<AggregationPreviewState>
    ) { }
}