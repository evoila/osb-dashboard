import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';

import { Bootstrap4FrameworkModule } from 'angular6-json-schema-form';
import {RabbitMQRoutingModule} from './rabbitmq-routing.module';
import { RabbitMQComponent } from './rabbitmq.component';
import { SettingsComponent } from './settings/settings.component';
import { RabbitMQService } from './rabbitmq.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    Bootstrap4FrameworkModule,
    RabbitMQRoutingModule
  ],
  declarations: [
    RabbitMQComponent,
    SettingsComponent
  ],
  providers: [
    RabbitMQService
  ]
})

export class RabbitMQModule { }
