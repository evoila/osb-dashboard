import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringComponent } from './monitoring.component';

import { PanelComponent } from './containers/panel/panel.component';
import { LogPanelComponent } from './containers/log-panel/log-panel.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: MonitoringComponent,
    children: [
      {
        path: 'panelconfigurator',
        loadChildren:
          './panel-configurator/panel-configurator.module#PanelConfiguratorModule'
      },
      {
        path: 'configurator',
        loadChildren:
          'app/monitoring/chart-configurator/chart-configurator.module#ChartConfiguratorModule'
      },
      {
        path: 'logs',
        component: LogPanelComponent
      },
      {
        path: 'panel/:id',
        component: PanelComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule {}
