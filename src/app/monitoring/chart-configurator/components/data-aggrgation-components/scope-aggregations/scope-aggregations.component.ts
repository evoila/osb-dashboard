import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AggregationRequestObject } from '../../../model/aggregationRequestObject';
import { ChartIncreationState } from '../../../store/reducers/chart.increation.reducer';
import { Store } from '@ngrx/store';
import { getChartIncreationAggregations } from 'app/monitoring/chart-configurator/store/selectors/chart.increation.selector';
import { Aggregation } from '../../../model/aggregation';
import { CfAuthParameterService } from '../../../services/cfauth-param.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { SetChartAggregations } from 'app/monitoring/chart-configurator/store';
import { ServiceBinding } from '../../../../model/service-binding';
import {
  getChartIncreationAggregationResponse,
  getReadyForRequestAggregationsId
} from '../../../store/selectors/chart.increation.selector';
import {
  UpdateChartAggregations,
  DeleteChartAggregations
} from '../../../store/actions/chart.increation.action';
import { switchMap, map, filter } from 'rxjs/operators';

@Component({
  selector: 'sb-scope-aggregations',
  templateUrl: './scope-aggregations.component.html',
  styleUrls: ['./scope-aggregations.component.scss']
})
export class ScopeAggregationsComponent implements OnInit {
  aggregations$: Observable<{ [id: string]: AggregationRequestObject }>;
  private aggScopes: { [id: string]: { name?: string; appId?: string } } = {};
  private aggregationRequestResults: { [id: string]: string } = {};
  constructor(
    private store: Store<ChartIncreationState>,
    private authParamService: CfAuthParameterService
  ) {}

  ngOnInit() {
    this.aggregations$ = this.store.select(getChartIncreationAggregations);
    // evaluate if aggregations work and mark them based on their status
    this.store
      .select(getChartIncreationAggregationResponse)
      .pipe(
        switchMap(response => {
          return this.store.select(getReadyForRequestAggregationsId).pipe(
            filter(k => k && k.length > 0),
            map(ids => {
              if (response.length == ids.length) {
                ids.map((id, index) => {
                  if (response[index]['error']) {
                    this.aggregationRequestResults = {
                      ...this.aggregationRequestResults,
                      [id]: 'error'
                    };
                  } else if (
                    response[index]['aggregations'][
                      Object.keys(response[index]['aggregations'])[0]
                    ]['buckets'].length == 0
                  ) {
                    this.aggregationRequestResults = {
                      ...this.aggregationRequestResults,
                      [id]: 'empty'
                    };
                  } else {
                    this.aggregationRequestResults = {
                      ...this.aggregationRequestResults,
                      [id]: 'ok'
                    };
                  }
                });
              }
            })
          );
        })
      )
      .subscribe();
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
    this.authParamService.createCfAuthScope().subscribe(authScope => {
      const aggregationRq = {
        aggregation: event.item.data,
        authScope
      } as AggregationRequestObject;
      this.store.dispatch(new SetChartAggregations(aggregationRq));
    });
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
