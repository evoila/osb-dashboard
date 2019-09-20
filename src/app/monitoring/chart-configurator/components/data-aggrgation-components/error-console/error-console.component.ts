import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { getFailedAggregation } from '../../../store/selectors/chart.increation.selector';
import { ChartIncreationAction } from '../../../store/actions/chart.increation.action';

@Component({
  selector: 'sb-error-console',
  templateUrl: './error-console.component.html',
  styleUrls: ['./error-console.component.scss']
})
export class ErrorConsoleComponent implements OnInit {
  public errorMessage: any;
  constructor(private store: Store<ChartIncreationAction>) { }

  ngOnInit() {
    this.store.select(getFailedAggregation).pipe(
      filter(k => !!k)
    ).subscribe(k => this.errorMessage = k);
  }

  hasError() {
    return !!Object.keys(this.errorMessage).length;
  }
}