import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringComponent } from './monitoring.component';

import { QueryEditorComponent } from 'app/monitoring/query-editor/query-editor.component';
import { PanelComponent } from './panel/panel.component';
import { PanelEditorComponent } from './panel-editor/panel-editor.component';
import { LogPanelComponent } from './log-panel/log-panel.component';
import { ConfiguratorComponent } from './chart-configurator/containers/configurator/configurator.component';

export const ROUTES = [
  {
    path: '',
    component: MonitoringComponent,
    children: [
      {
        path: 'paneleditor/:id',
        component: PanelEditorComponent
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
      },
      {
        path: 'paneleditor',
        component: PanelEditorComponent
      },
      {
        path: 'queryeditor',
        component: QueryEditorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule {}
