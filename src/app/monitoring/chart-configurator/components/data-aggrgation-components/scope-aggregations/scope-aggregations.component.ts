import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AggregationRequestObject } from '../../../model/aggregationRequestObject';
import { ChartIncreationState } from '../../../store/reducers/chart.increation.reducer';
import { Store } from '@ngrx/store';
import { getChartIncreationAggregations } from 'app/monitoring/chart-configurator/store/selectors/chart.increation.selector';
import { Aggregation } from '../../../model/aggregation';
import { CfAuthParameterService } from '../../../../shared/services/cfauth-param.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ServiceBinding } from '../../../../model/service-binding';
import {
  UpdateChartAggregations,
  DeleteChartAggregations
} from '../../../store/actions/chart.increation.action';
import { getChartIncreationAggregationState } from '../../../store/selectors/chart.increation.selector';
import { BindingsState } from '../../../../shared/store/reducers/binding.reducer';

@Component({
  selector: 'sb-scope-aggregations',
  templateUrl: './scope-aggregations.component.html',
  styleUrls: ['./scope-aggregations.component.scss']
})
export class ScopeAggregationsComponent implements OnInit {
  aggregations$: Observable<{ [id: string]: AggregationRequestObject }>;
  private aggScopes: { [id: string]: { name?: string; appId?: string } } = {};
  private aggregationRequestResults: { [id: string]: string } = {};
  private authParamService: CfAuthParameterService;
  constructor(
    private store: Store<ChartIncreationState>,
    storeBindings: Store<BindingsState>,
    authParamService: CfAuthParameterService
  ) {
    this.authParamService = authParamService.construct(storeBindings);
  }

  ngOnInit() {
    this.aggregations$ = this.store.select(getChartIncreationAggregations);
    // evaluate if aggregations work and mark them based on their status
    this.store
      .select(getChartIncreationAggregationState)
      .subscribe(aggs => (this.aggregationRequestResults = aggs));
  }

  public getWarnClass(id: string) {
    const returnVal = this.aggregationRequestResults[id]
      ? this.aggregationRequestResults[id]
      : [];
    return returnVal;
  }
  public updateName(name: string, id: number) {
    this.aggScopes = {
      ...this.aggScopes,
      [id]: { ...this.aggScopes[id], name }
    };
  }
  public updateId(binding: ServiceBinding, id: string) {
    const { appId } = binding;
    this.aggScopes = {
      ...this.aggScopes,
      [id]: { ...this.aggScopes[id], appId }
    };
  }
  public drop(event: CdkDragDrop<Aggregation>) {
    /*     this.authParamService
          .createCfAuthScope()
          .pipe(take(1))
          .subscribe(authScope => {
            const aggregationRq = {
              aggregation: event.item.data,
              authScope
            } as AggregationRequestObject;
            this.store.dispatch(new SetChartAggregations(aggregationRq));
          }); */
  }
  public update(key: string, aggregation: AggregationRequestObject) {
    const { name, appId } = this.aggScopes[key];
    const updatedAgg = {
      ...aggregation,
      name,
      appId
    } as AggregationRequestObject;
    this.store.dispatch(new UpdateChartAggregations(updatedAgg, key));
  }
  public delete(key: string) {
    this.store.dispatch(new DeleteChartAggregations(key));
  }
}
