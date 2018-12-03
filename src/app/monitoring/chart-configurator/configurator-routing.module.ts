import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { OptionsComponent } from 'app/monitoring/chart-configurator/containers/options/options.component';
import { RouterModule } from '@angular/router';
import { ConfiguratorComponent } from 'app/monitoring/chart-configurator/containers/configurator/configurator.component';

const routes: Routes = [
  {
    path: '',
    component: ConfiguratorComponent
  },

  {
    path: 'options/:id',
    component: OptionsComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguratorRoutingModule {}
