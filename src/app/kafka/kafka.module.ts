import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'app/core/core.module';

import { Bootstrap4FrameworkModule } from 'angular6-json-schema-form';
import { KafkaComponent } from './kafka.component';
import { KafkaRoutingModule } from './kafka-routing.module';
import { KafkaUsersComponent } from './kafka-users/kafka-users.component';
import { KafkaSettingsComponent } from './kafka-settings/kafka-settings.component';
import { ZookeeperSettingsComponent } from './zookeeper-settings/zookeeper-settings.component';
import { Log4jSettingsComponent } from './log4j-setting/log4j-settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    KafkaRoutingModule,
    Bootstrap4FrameworkModule
  ],
  declarations: [KafkaComponent, KafkaUsersComponent, KafkaSettingsComponent, Log4jSettingsComponent, ZookeeperSettingsComponent]
})
export class KafkaModule { }
