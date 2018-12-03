import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { OptionsComponent } from './containers/options/options.component';
import { EffectsModule } from '@ngrx/effects';
import { ConfiguratorComponent } from './containers/configurator/configurator.component';

import { SharedModule } from '../shared/shared.module';
import { services } from './services/index';
import { ChartDirective } from './chart.directive';
import { ConfiguratorRoutingModule } from './configurator-routing.module';
import { componentsDeclarations } from './components/index';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('charts', reducers),
    EffectsModule.forFeature(effects),
    SharedModule,
    ConfiguratorRoutingModule,
    ConfiguratorRoutingModule
  ],
  declarations: [
    OptionsComponent,
    ConfiguratorComponent,
    ChartDirective,
    ...componentsDeclarations
  ],
  providers: services
})
export class ChartConfiguratorModule {}
