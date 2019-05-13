import {
  Component,
  OnInit,
  Input,
  Inject,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';
import { Aggregation } from '../../../model/aggregation';
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material';
import { Store } from '@ngrx/store';
import { DeleteAggregation, EditAggregation, SetChartAggregations, getChartIncreationAggregationState } from 'app/monitoring/chart-configurator/store';
import { AggregationState } from '../../../store/reducers/aggregation.reducer';
import { AggregationRequestObject } from 'app/monitoring/chart-configurator/model/aggregationRequestObject';
import { ChartIncreationState } from 'app/monitoring/chart-configurator/store/reducers/chart.increation.reducer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'sb-aggregation-list',
  templateUrl: './aggregation-list.component.html',
  styleUrls: ['./aggregation-list.component.scss']
})
export class AggregationListComponent implements OnInit {
  @Input('aggregations')
  public aggregations$: Observable<Array<Aggregation>>;

  @Input('id')
  componentId: string;


  @Input()
  aggregationRequestObject: AggregationRequestObject;

  showDetails: boolean = false;

  // Result holds information if Aggregation + Scope dows generate any data
  aggregationRequestResults: string;

  // Output Emitter is just a toggle for the Component above to render AggregationEditor
  @Output('aggregationEditor')
  public openAggregationEditor$ = new EventEmitter<Boolean>();

  @Output('picked')
  picked = new EventEmitter<Aggregation>();


  public aggregations: Array<Aggregation>;
  constructor(
    private bottomSheet: MatBottomSheet,
    private store: Store<ChartIncreationState>
  ) { }

  ngOnInit() {
    this.aggregations$.subscribe(
      (aggregations: Array<Aggregation>) => (this.aggregations = aggregations)
    );
    this.store
      .select(getChartIncreationAggregationState).pipe(filter(k => !!k[this.componentId]))
      .subscribe(aggs => (this.aggregationRequestResults = aggs[this.componentId]));
  }
  public aggregationEmpty() {
    return Object.keys(this.aggregationRequestObject).length == 0;
  }
  openAggregationEditor(): void {
    this.openAggregationEditor$.emit(true);
  }
  pick(aggregation: Aggregation) {
    this.picked.emit(aggregation);
  }
  updateId(scope: any) {
    const { appId } = scope;
    let { name } = this.aggregationRequestObject.aggregation;
    name = `${name} - ${scope.appName}`;
    this.aggregationRequestObject = { ...this.aggregationRequestObject, appId, name };
    this.store.dispatch(new SetChartAggregations(this.aggregationRequestObject, this.componentId))
  }
  delete() {
    this.showDetails = !this.showDetails;
    this.store.dispatch(new DeleteAggregation(this.aggregationRequestObject.aggregation));
  }
  edit() {
    this.store.dispatch(new EditAggregation(this.aggregationRequestObject.aggregation, this.componentId));
  }
}

@Component({
  selector: 'bottom-sheet-aggregation-sheet',
  templateUrl: './bottom-sheet-aggregation-sheet.html',
  styleUrls: ['./bottom-sheet-aggregation-sheet.scss']
})
export class BottomSheetAggregationSheet {
  constructor(
    private store: Store<AggregationState>,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetAggregationSheet>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Aggregation
  ) { }
  delete() {
    this.store.dispatch(new DeleteAggregation(this.data));
  }
  edit() { }
  dismiss(): void {
    this.bottomSheetRef.dismiss();
  }
}
