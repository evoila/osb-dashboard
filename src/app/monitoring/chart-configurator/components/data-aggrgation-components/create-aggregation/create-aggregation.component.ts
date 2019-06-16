import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Field } from '../../../../aggregation-editor/model/field';
import { SearchService } from '../../../../shared/services/search.service';
import { Aggregation } from '../../../model/aggregation';
import { Store } from '@ngrx/store';
import { BindingsState } from 'app/monitoring/shared/store/reducers/binding.reducer';
import { CfAuthParameterService } from 'app/monitoring/shared/services/cfauth-param.service';
import { take, last, map, filter } from 'rxjs/operators';
import { AggregationRequestObject } from 'app/monitoring/chart-configurator/model/aggregationRequestObject';
import { AggregationPreviewEffect } from 'app/monitoring/chart-configurator/store/effects/aggregation.preview.effect';
import { SetAggregationForPreview, AggregationPreviewFlush, CreateAggregationCancel } from 'app/monitoring/chart-configurator/store/actions/aggregation.preview.action';
import { getPreviewAggregation } from '../../../store/selectors/';
import { Subscriber, Subject } from 'rxjs';

@Component({
  selector: 'sb-create-aggregation',
  templateUrl: './create-aggregation.component.html',
  styleUrls: ['./create-aggregation.component.scss']
})
export class CreateAggregationComponent implements OnInit {
  public fields$: Observable<Map<string, Array<Field>>>;

  @Input('type')
  public type: string;
  @Input('aggregationOnEdit')
  aggregationOnEdit: Aggregation;
  @Output('result')
  public result: EventEmitter<any> = new EventEmitter<any>();
  @Output('close')
  public close: EventEmitter<any> = new EventEmitter<any>();

  subject = new Subject<AggregationRequestObject>();
  aggregationSubject = new Subject<AggregationRequestObject>();
  aggregation$: Observable<AggregationRequestObject> = new Observable(k => {
    this.aggregationSubject.subscribe(k);
  })
  scopedAggregation$: Observable<AggregationRequestObject> = new Observable(k => {
    this.subject.subscribe(k);
  });

  // observables to inject button events into aggregation-editor
  buttonSubject = new Subject<string>();
  buttonInput$ = new Observable<string>(k => this.buttonSubject.subscribe(k));

  private authParamService: CfAuthParameterService;
  constructor(
    private readonly searchService: SearchService,
    storeBindings: Store<BindingsState>,
    authParamService: CfAuthParameterService,
    public store: Store<AggregationPreviewEffect>
  ) {
    this.authParamService = authParamService.construct(storeBindings);
  }

  ngOnInit() {
    this.fields$ = this.searchService.getMappingWithType();
  }

  public getResults(event: any) {
    if (event == 'cancel') {
      this.close.emit();
    }
    this.result.emit(event);
    if (this.aggregationOnEdit) {
      this.store.dispatch(new AggregationPreviewFlush());
    } else {
      this.aggregation$.pipe(take(1)).subscribe(k => this.store.dispatch(new CreateAggregationCancel(k.aggregation)));
    }
  }

  buttonListener(type: string) {
    this.buttonSubject.next(type);
  }

  setRequestObject(aggRequObj: any) {
    this.subject.next(aggRequObj);
  }

  triggerPreview(aggregation: any) {
    this.authParamService
      .createCfAuthScope()
      .pipe(take(1))
      .subscribe(authScope => {
        let scopedAggregation = {
          actualAggregation: aggregation.aggregations,
          authScope,
          chartTypes: aggregation.applicableOn,
          name: aggregation.name,
          description: aggregation.description,
          public: false,
          index: aggregation.index
        } as Aggregation;
        const agg = {
          aggregation: scopedAggregation,
          authScope
        } as AggregationRequestObject;

        this.aggregationSubject.next(agg);
      })
  }
}
