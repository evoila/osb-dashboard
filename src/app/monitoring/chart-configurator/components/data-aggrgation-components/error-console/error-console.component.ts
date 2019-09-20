import { Component, OnInit } from '@angular/core';
import { AggregationPreviewState } from '../../../store/reducers/aggregation.preview.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { getFailedAggregation } from '../../../store/selectors/chart.increation.selector';

@Component({
  selector: 'sb-error-console',
  templateUrl: './error-console.component.html',
  styleUrls: ['./error-console.component.scss']
})
export class ErrorConsoleComponent implements OnInit {
  public errorMessage: any;
  constructor(private store: Store<AggregationPreviewState>) { }

  ngOnInit() {
    this.store.select(getFailedAggregation).pipe(
      filter(k => !!k)
    ).subscribe(k => this.errorMessage = k);
  }

  hasError() {
    return !!Object.keys(this.errorMessage).length;
  }
}