import { Component, OnInit } from '@angular/core';
import { AggregationState } from '../../store/reducers/aggregation.reducer';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import {
  LoadAggregations,
  SaveAggregation
} from '../../store/actions/aggregation.action';
import { getAllAggregationEntities } from '../../store/selectors/aggregation.selector';
import { ChartIncreationState } from '../../store/reducers/chart.increation.reducer';
import { Observable } from 'rxjs';
import { Aggregation } from '../../model/aggregation';
import { CfAuthParameterService } from '../../services/cfauth-param.service';
import {
  getChartIncreationType,
  getReadyForRequestAggregations
} from '../../store/selectors/chart.increation.selector';
import {
  SetChartAggregations,
  FireAggregations
} from '../../store/actions/chart.increation.action';
import { AggregationRequestObject } from '../../model/aggregationRequestObject';

@Component({
  selector: 'sb-data-aggregation',
  templateUrl: './data-aggregation.component.html',
  styleUrls: ['./data-aggregation.component.scss']
})
export class DataAggregationComponent implements OnInit {
  public chartType: string;
  public aggregations$: Observable<Array<Aggregation>>;
  public aggregationEditorPresent = false;

  private previousFinishedAggs: Array<AggregationRequestObject> = [];

  constructor(
    private aggregationStore: Store<AggregationState>,
    private chartStore: Store<ChartIncreationState>,
    private cfAuthScopeService: CfAuthParameterService
  ) {}

  public getAggregationResult(aggregation: any) {
    if (aggregation === 'cancel') {
      this.aggregationEditorPresent = false;
      return;
    }
    this.cfAuthScopeService.createCfAuthScope().subscribe(authScope => {
      const scopedAggregation = {
        actualAggregation: aggregation.aggregations,
        authScope,
        chartTypes: aggregation.applicableOn,
        name: aggregation.name,
        description: aggregation.description,
        public: false
      } as Aggregation;

      const aggregationRqo = {
        aggregation: scopedAggregation,
        authScope
      } as AggregationRequestObject;

      this.chartStore.dispatch(new SetChartAggregations(aggregationRqo));
      this.aggregationStore.dispatch(new SaveAggregation(scopedAggregation));
      this.aggregationEditorPresent = false;
    });
  }

  ngOnInit() {
    this.chartStore
      .select(getChartIncreationType)
      .pipe(
        tap((chartType: string) =>
          this.aggregationStore.dispatch(new LoadAggregations(chartType))
        )
      )
      .subscribe(chartType => (this.chartType = chartType));

    this.aggregations$ = this.aggregationStore.select(
      getAllAggregationEntities
    );
    this.chartStore
      .select(getReadyForRequestAggregations)
      .subscribe(aggregationRqs => {
        if (
          aggregationRqs.length != this.previousFinishedAggs.length ||
          checkNotEquals(aggregationRqs, this.previousFinishedAggs)
        ) {
          this.chartStore.dispatch(new FireAggregations(aggregationRqs));
          this.previousFinishedAggs = aggregationRqs;
        }
      });
  }
}
export function checkNotEquals(
  arr1: Array<AggregationRequestObject>,
  arr2: Array<AggregationRequestObject>
): boolean {
  const result = arr1.filter(
    (el, i) => el.appId != arr2[i].appId || el.appId != arr2[i].appId
  );
  return result.length != 0;
}
