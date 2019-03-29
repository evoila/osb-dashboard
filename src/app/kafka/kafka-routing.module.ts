import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KafkaComponent } from './kafka.component';
import { KafkaUsersComponent } from './kafka-users/kafka-users.component';
import { KafkaSettingsComponent } from './kafka-settings/kafka-settings.component';
import { ZookeeperSettingsComponent } from './zookeeper-settings/zookeeper-settings.component';

export const ROUTES = [
  {
    path: '',
    component: KafkaComponent,
    children: [{
        path: '',
        component: KafkaSettingsComponent,
        pathMatch: 'full'
      },{
        path: 'kafka-users',
        component: KafkaUsersComponent,
      },{
        path: 'zookeeper-settings',
        component: ZookeeperSettingsComponent
      }]
    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class KafkaRoutingModule { }
