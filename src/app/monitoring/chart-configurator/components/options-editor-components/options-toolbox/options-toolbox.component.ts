import { Component, OnInit, Input } from '@angular/core';
import { ChartIncreationAction } from '../../../store/actions/chart.increation.action';
import { Store } from '@ngrx/store';
import { NavigateToAggregations } from '../../../store/actions/router.action';
import { OptionDomainViewModel } from '../../../model/optionViewModels';

@Component({
  selector: 'sb-options-toolbox',
  templateUrl: './options-toolbox.component.html',
  styleUrls: ['./options-toolbox.component.scss']
})
export class OptionsToolboxComponent implements OnInit {
  // used to unfold actions in the template -1 indicates no action visible
  public visibleActions = -1;

  @Input('optionDomains')
  public optionDomains: Array<OptionDomainViewModel>;

  public dispatchActions(action, payload?: string) {
    if (payload) {
      this.store.dispatch(new action.Action(action.payload));
    }
    if (action.payload) {
      this.store.dispatch(new action.Action(action.payload));
    } else {
      this.store.dispatch(new action.Action());
    }
  }
  public saveOptions() {
    this.store.dispatch(new NavigateToAggregations());
  }
  public showActions(index: number) {
    if (this.visibleActions === index) {
      this.visibleActions = -1;
    } else {
      this.visibleActions = index;
    }
  }
  constructor(private store: Store<ChartIncreationAction>) { }

  ngOnInit() { }
}
