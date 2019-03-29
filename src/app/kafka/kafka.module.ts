import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'app/core/core.module';

import { KafkaComponent } from './kafka.component';
import { KafkaRoutingModule } from './kafka-routing.module';
import { KafkaUsersComponent } from './kafka-users/kafka-users.component';
import { KafkaSettingsComponent } from './kafka-settings/kafka-settings.component';
import { ZookeeperSettingsComponent } from './zookeeper-settings/zookeeper-settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    KafkaRoutingModule
  ],
  declarations: [KafkaComponent, KafkaUsersComponent, KafkaSettingsComponent, ZookeeperSettingsComponent]
})
export class KafkaModule { }
