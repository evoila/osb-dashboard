import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as uuid from 'uuid';
import { Observable, Subject } from 'rxjs';
import { Aggregation } from 'app/monitoring/chart-configurator/model/aggregation';
import { AggregationRequestObject } from 'app/monitoring/chart-configurator/model/aggregationRequestObject';
import { Store } from '@ngrx/store';
import { ChartIncreationState } from 'app/monitoring/chart-configurator/store/reducers/chart.increation.reducer';
import { getChartIncreationAggregations, DeleteChartAggregations, SetChartAggregations, EditAggregation } from 'app/monitoring/chart-configurator/store';
import { CfAuthParameterService } from 'app/monitoring/shared/services/cfauth-param.service';
import { BindingsState } from 'app/monitoring/shared/store/reducers/binding.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'sb-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
  @Input()
  aggregations$: Observable<Array<Aggregation>>;

  /* indicates wether the aggregation editor is on or not 
    if it's on it's initialized with the data-row id so the newly create aggregation can be assigned to a row
    if not it must be undefined
  */
  aggregationEditorOnFor: string;

  // Output Emitter is just a toggle for the Component above to render AggregationEditor
  @Output('aggregationEditor')
  public openAggregationEditor$ = new EventEmitter<Boolean>();

  entries: { [id: string]: AggregationRequestObject };

  authParamService: CfAuthParameterService;

  constructor(
    private store: Store<ChartIncreationState>,
    authParamService: CfAuthParameterService,
    storeBindings: Store<BindingsState>
  ) {
    this.authParamService = authParamService.construct(storeBindings);
  }

  ngOnInit() {
    this.store.select(getChartIncreationAggregations).subscribe(
      k => this.entries = k
    )
  }

  add() {
    this.store.dispatch(new SetChartAggregations({} as AggregationRequestObject, uuid.v4()));
  }

  pushAggregation(aggregation: Aggregation, id: string) {

    this.authParamService
      .createCfAuthScope()
      .pipe(take(1))
      .subscribe(authScope => {
        const aggregationRq = {
          aggregation,
          authScope
        } as AggregationRequestObject;
        this.store.dispatch(new SetChartAggregations(aggregationRq, id));
      });
  }
  delete(id: string) {
    this.store.dispatch(new DeleteChartAggregations(id));
    delete this.entries[id];
  }
}
