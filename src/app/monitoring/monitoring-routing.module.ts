import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringComponent } from './monitoring.component';

import { PanelComponent } from './containers/panel/panel.component';
import { LiveLogsComponent } from './containers/live-logs/live-logs.component';
import { ExploreLogsComponent } from './containers/explore-logs/explore-logs.component';
import { SearchLogsComponent } from './containers/search-logs/search-logs.component';

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
        path: 'chartconfigurator',
        loadChildren:
          'app/monitoring/chart-configurator/chart-configurator.module#ChartConfiguratorModule'
      },
      {
        path: 'tableeditor',
        loadChildren:
        'app/monitoring/table-editor/table-editor.module#TableEditorModule'
      },
      {
        path: 'panel/:id',
        component: PanelComponent
      },
      {
        path: 'stream',
        component: LiveLogsComponent
      },
      {
        path: 'explore',
        component: ExploreLogsComponent
      },
      {
        path: 'search',
        component: SearchLogsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
