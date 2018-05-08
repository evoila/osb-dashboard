import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringComponent } from './monitoring.component';
import { LogsComponent } from './logs/logs.component';
import { MetricsComponent } from './metrics/metrics.component';
import { QueryEditorComponent } from 'app/monitoring/query-editor/query-editor.component';
import { PanelComponent } from './panel/panel.component';
import { PanelEditorComponent } from './panel-editor/panel-editor.component';


export const ROUTES = [
  {
    path: '',
    component: MonitoringComponent,
    children: [
      {
        path: 'charts',
        component: LogsComponent
      },
      {
        path: 'metrics',
        component: MetricsComponent
      },
      {
        path: 'paneleditor/:id',
        component: PanelEditorComponent
      },
      {
        path: 'panel',
        component: PanelComponent
      },
      {
        path: 'paneleditor',
        component: PanelEditorComponent
      },
      {
        path: 'queryeditor',
        component: QueryEditorComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
