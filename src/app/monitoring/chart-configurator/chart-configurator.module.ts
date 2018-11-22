import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { reducers, effects } from './store';
import { OptionsComponent } from './options/options.component';
import { EffectsModule } from '@ngrx/effects';
import { BaseChartComponent } from './components/base-chart/base-chart.component';
import { ConfiguratorComponent } from './containers/configurator/configurator.component';

import { SharedModule } from '../shared/shared.module';
import { services } from './services/index';
import { ChartDirective } from './chart.directive';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('charts', reducers),
    EffectsModule.forFeature(effects),
    SharedModule
  ],
  declarations: [OptionsComponent, BaseChartComponent, ConfiguratorComponent, ChartDirective],
  providers: services
})
export class ChartConfiguratorModule {}
