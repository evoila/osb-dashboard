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
import { DeleteAggregation, EditAggregation } from 'app/monitoring/chart-configurator/store';
import { AggregationState } from '../../../store/reducers/aggregation.reducer';
import { AggregationRequestObject } from 'app/monitoring/chart-configurator/model/aggregationRequestObject';

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


  // Output Emitter is just a toggle for the Component above to render AggregationEditor
  @Output('aggregationEditor')
  public openAggregationEditor$ = new EventEmitter<Boolean>();

  @Output('picked')
  picked = new EventEmitter<Aggregation>();


  public aggregations: Array<Aggregation>;
  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.aggregations$.subscribe(
      (aggregations: Array<Aggregation>) => (this.aggregations = aggregations)
    );
  }
  public showAggregation(aggregation: Aggregation): void {
    this.bottomSheet.open(BottomSheetAggregationSheet, { data: aggregation });
  }
  public aggregationEmpty() {
    return Object.keys(this.aggregationRequestObject).length == 0;
  }
  openAggregationEditor(): void {
    this.openAggregationEditor$.next(true);
  }
  pick(aggregation: Aggregation) {
    this.picked.emit(aggregation);
  }
  edit() {
    /* this.store.dispatch(new EditAggregation(this.data)); */
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
  dismiss(): void {
    this.bottomSheetRef.dismiss();
  }
  edit() {
    this.store.dispatch(new EditAggregation(this.data));
  }
}
