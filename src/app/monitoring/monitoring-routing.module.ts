import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MonitoringComponent } from './monitoring.component';
import { LogsComponent } from './logs/logs.component';
import { MetricsComponent } from './metrics/metrics.component';


export const ROUTES = [
  {
    path: '',
    component: MonitoringComponent
  },
  {
    path: 'logs',
    component: LogsComponent
  },
  {
    path: 'metrics',
    component: MetricsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
