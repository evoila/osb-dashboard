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
  public optionsViewModel: Array<HorizontalNavViewModel>;

  // Locks the auto-reload Mechanism after second Loading attempt
  private retry = false;

  public optionsDomainViewModel = optionsDomain;

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
    payload: 'easeInOutBounce'
  }, 
] as Array<ActionViewModel>;

const ledgendActions = [
  {
    name: 'Disable Ledgend',
    Action: fromStore.SetLedgendDisabled,
    iconClass: ''
  },
  {
    name: 'Display Ledgend Right',
    Action: fromStore.SetLedgendPosition,
    iconClass: '',
    payload: 'right'
  },
  {
    name: 'Display Ledgend Left',
    Action: fromStore.SetLedgendPosition,
    iconClass: '',
    payload: 'left'
  },
  {
    name: 'Display Ledgend Bottom',
    Action: fromStore.SetLedgendPosition,
    iconClass: '',
    payload: 'bottom'
  },
  {
    name: 'Display Ledgend Top',
    Action: fromStore.SetLedgendPosition,
    iconClass: '',
    payload: 'top'
  }
]
const titleActions = [
  {
    name: 'Disable Title',
    Action: fromStore.SetTitleDisabled,
  },
  {
    name: 'Position Title Left',
    Action: fromStore.SetTitlePosition,
    payload: 'left'
  },
  {
    name: 'Position Title Right',
    Action: fromStore.SetTitlePosition,
    payload: 'right'
  },
  {
    name: 'Position Title Top',
    Action: fromStore.SetTitlePosition,
    payload: 'top'
  },
  {
    name: 'Position Title Bottom',
    Action: fromStore.SetTitlePosition,
    payload: 'bottom'
  }
]
const optionsDomain = [
  {
    name: 'Animation',
    iconClass: 'fas fa-signature',
    actions: animationActions
  },
  {
    name: 'Ledgend',
    actions: ledgendActions
  },
  {
    name: 'Title',
    actions: titleActions
  }
] as Array<OptionDomainViewModel>;
