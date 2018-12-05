import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../store';

import { Store } from '@ngrx/store';
import { ChartOptionsEntity } from '../../model/chart-options-entity';
import { RouterAction } from '@ngrx/router-store';
import { RouterStateUrl, getParamByName } from '../../../store/reducers/index';
import { take } from 'rxjs/internal/operators';
import { HorizontalNavViewModel } from '../../components/options-editor-components/horizontal-navigation/horizontal-navigation.component';
import { OptionsState } from '../../store/reducers/options.reducer';

import {
  ActionViewModel,
  OptionDomainViewModel
} from '../../components/options-editor-components/options-toolbox/options-toolbox.component';

@Component({
  selector: 'sb-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  // Actual Data
  private options: { [id: string]: ChartOptionsEntity };
  // Options View Model is a very flat representation for Child Components to render View
  private optionsViewModel: Array<HorizontalNavViewModel>;

  // Locks the auto-reload Mechanism after second Loading attempt
  private retry = false;

  private optionsDomainViewModel = optionsDomain;

  ngOnInit() {
    this.store.select(fromStore.getAllOptionsLoaded).subscribe(loaded => {
      if (loaded) {
        this.store.select(fromStore.getOptionEntities).subscribe(options => {
          this.options = options;
          this.optionsViewModel = this.buildViewModel(options);
        });
      } else if (!this.retry) {
        this.routerStore
          .select(getParamByName('id'))
          .pipe(take(1))
          .subscribe(chartType =>
            this.store.dispatch(new fromStore.LoadOptions(chartType))
          );
        this.retry = true;
      }
    });
  }
  constructor(
    private store: Store<OptionsState>,
    private routerStore: Store<RouterAction<RouterStateUrl>>
  ) {}

  // Utility Functions
  private buildViewModel(options: { [id: string]: ChartOptionsEntity }) {
    return Object.keys(options)
      .map(k => options[k])
      .map(option => {
        return { name: option.name!!, id: option.id!! };
      });
  }

  // Action Listeners
  public userSelectedOption(choosenOption: HorizontalNavViewModel) {
    this.store.dispatch(
      new fromStore.SetChartOptions({ ...this.options[choosenOption.id] })
    );
  }
}

const animationActions = [
  {
    name: 'disableAnimation',
    Action: fromStore.SetAnimationDisabled,
    iconClass: 'fas fa-toggle-off'
  },
  {
    name: 'Linear animation',
    Action: fromStore.SetAnimation,
    iconClass: 'fas fa-chart-line',
    payload: 'linear'
  },
  {
    name: 'Ease in Quad animation',
    Action: fromStore.SetAnimation,
    iconClass: 'fas fa-toggle-off',
    payload: 'easeInQuad'
  }
] as Array<ActionViewModel>;

const optionsDomain = [
  {
    name: 'Animation',
    iconClass: 'fas fa-signature',
    actions: animationActions
  }
] as Array<OptionDomainViewModel>;
