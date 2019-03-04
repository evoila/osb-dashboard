import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RabbitMQComponent } from './rabbitmq.component';

import { SettingsComponent } from './settings/settings.component';

export const ROUTES = [
{
  path: '',
  component: RabbitMQComponent,
  children: [{
    path: '',
    component: SettingsComponent,
    pathMatch: 'full'
  }

  ]
  }];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RabbitMQRoutingModule { }
