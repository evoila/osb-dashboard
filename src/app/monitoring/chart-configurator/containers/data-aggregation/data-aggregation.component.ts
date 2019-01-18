// TODO: Optimize imports
import { Component, OnInit } from '@angular/core';
import { AggregationState } from '../../store/reducers/aggregation.reducer';
import { Store } from '@ngrx/store';
import { tap, take } from 'rxjs/operators';
import {
  LoadAggregations,
  SaveAggregation
} from '../../store/actions/aggregation.action';
import { getAllAggregationEntities } from '../../store/selectors/aggregation.selector';
import { ChartIncreationState } from '../../store/reducers/chart.increation.reducer';
import { Observable } from 'rxjs';
import { Aggregation } from '../../model/aggregation';
import { CfAuthParameterService } from '../../../shared/services/cfauth-param.service';
import {
  getChartIncreationType,
  getReadyForRequestAggregations
} from '../../store/selectors/chart.increation.selector';
import {
  SetChartAggregations,
  FireAggregations
} from '../../store/actions/chart.increation.action';
import { AggregationRequestObject } from '../../model/aggregationRequestObject';
import {
  getChartIncreationAggregationState,
  getChartIncreationAggregations,
  hasError
} from '../../store/selectors/chart.increation.selector';
import { ChartModelState } from 'app/monitoring/shared/store/reducers/chart.reducer';
import { SaveChart } from '../../../shared/store/actions/chart.actions';
import { getChartIncreationOptions } from '../../store/selectors/chart.increation.selector';
import { ChartOptionsEntity } from '../../model/chart-options-entity';
import { Chart } from '../../../shared/model/chart';
import { Router } from '@angular/router';
import { BindingsState } from '../../../shared/store/reducers/binding.reducer';
import { getChartSaved } from '../../../shared/store/selectors/chart.selector';
import { FlushState } from '../../store/actions/chart.increation.action';

@Component({
  selector: 'sb-data-aggregation',
  templateUrl: './data-aggregation.component.html',
  styleUrls: ['./data-aggregation.component.scss']
})
export class DataAggregationComponent implements OnInit {
  public chartType: string;
  public aggregations$: Observable<Array<Aggregation>>;
  public aggregationEditorPresent = false;
  public aggregationState: { [id: string]: string } = {};
  private options: ChartOptionsEntity;
  private chartIncAgg: { [id: string]: AggregationRequestObject };
  private name: string;
  private authParamService: CfAuthParameterService;

  private previousFinishedAggs: { [id: string]: AggregationRequestObject } = {};

  constructor(
    private aggregationStore: Store<AggregationState>,
    private chartStore: Store<ChartIncreationState>,
    storeBindings: Store<BindingsState>,
    authParamService: CfAuthParameterService,
    private chartModelStore: Store<ChartModelState>,
    private router: Router
  ) {
    this.authParamService = authParamService.construct(storeBindings);
  }

  public getAggregationResult(aggregation: any) {
    if (aggregation === 'cancel') {
      this.aggregationEditorPresent = false;
      return;
    }
    this.authParamService
      .createCfAuthScope()
      .pipe(take(1))
      .subscribe(authScope => {
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
    // TODO: minimize code to be one store call and handle more complex calls in Selectors as
    // they have access to all Objects
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
      .select(getChartIncreationAggregationState)
      .subscribe(aggState => (this.aggregationState = aggState));

    this.chartStore
      .select(getChartIncreationOptions)
      .subscribe(oSet => (this.options = oSet));

    this.chartStore
      .select(getChartIncreationAggregations)
      .subscribe(chaAgs => (this.chartIncAgg = chaAgs));

    this.chartStore
      .select(getReadyForRequestAggregations)
      .subscribe(aggregationRqs => {
        if (
          Object.keys(aggregationRqs).length !=
            Object.keys(this.previousFinishedAggs).length ||
          checkNotEquals(aggregationRqs, this.previousFinishedAggs)
        ) {
          this.chartStore.dispatch(new FireAggregations(aggregationRqs));
          this.previousFinishedAggs = aggregationRqs;
        }
      });
  }
  public save() {
    if (
      this.chartType &&
      this.name &&
      this.options &&
      Object.keys(this.chartIncAgg).length > 0 &&
      Object.keys(this.aggregationState).length ==
        Object.keys(this.chartIncAgg).length &&
      !hasError(this.aggregationState)
    ) {
      this.authParamService
        .createCfAuthScope()
        .pipe(take(1))
        .subscribe(authScope => {
          const chart = {
            name: this.name,
            authScope: authScope,
            type: this.chartType,
            option: this.options,
            aggregations: getObjectAsArray(this.chartIncAgg)
          } as Chart;
          this.chartModelStore.dispatch(new SaveChart(chart));
          this.chartModelStore
            .select(getChartSaved)
            .pipe(take(2))
            .subscribe(getChartSaved => {
              if (getChartSaved) {
                this.chartStore.dispatch(new FlushState());
                this.router.navigate(['monitoring']);
              }
            });
        });
    } else {
      alert(
        'Your chart is missing something. Better check the sate of your aggregations and remove the broke ones'
      );
    }
  }
  public cancel() {
    this.chartStore.dispatch(new FlushState());
    this.router.navigate(['monitoring']);
  }
}

export function checkNotEquals(
  obj1: { [id: string]: AggregationRequestObject },
  obj2: { [id: string]: AggregationRequestObject }
): boolean {
  const result = Object.keys(obj1).filter(
    (el, i) =>
      obj1[el].appId != obj2[el].appId || obj1[el].name != obj2[el].name
  );
  return result.length != 0;
}

export function getObjectAsArray(obj: any) {
  return Array.from(
    new Map<string, any>(Object.entries(obj))[Symbol.iterator]()
  ).map(k => k[1]);
}
