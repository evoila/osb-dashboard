import { Component, OnInit, Input } from '@angular/core';
import { ChartIncreationAction } from '../../../store/actions/chart.increation.action';
import { Store } from '@ngrx/store';
import { NavigateToAggregations } from '../../../store/actions/router.action';

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

  public dispatchActions(action) {
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
  constructor(private store: Store<ChartIncreationAction>) {}

  ngOnInit() {}
}

export interface OptionDomainViewModel {
  /* Interface taht defines the way data has to be given into this component
   * The Component builds the navigation from it
   * Every main Attribute is immediatly visible actions are translatet in
   * subnavigation Items.
   */

  name: string;
  // Font Awesome Icon Class
  iconClass: string;
  actions: Array<ActionViewModel>;
}
export interface ActionViewModel {
  /*  the action ViewModel is responsible for the Subnavigation Items
   *  each of these Items is a Closure at heart. They transform the option-state
   *  this transformation is achived via a ngrx action tht is dispatched
   *  there has to be an effect that is responsible for each and every state mutation
   */

  name: string;
  Action: { new (...arg: any) };
  payload: any;
  // Font Awesome Icon Class
  iconClass: string;
}
