import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedisComponent } from './redis.component';
import { RedisSettingsComponent } from './redis-settings/redis-settings.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'app/core/core.module';
import { Bootstrap4FrameworkModule } from 'angular6-json-schema-form';
import { RedisRoutingModule } from './redis-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    RedisRoutingModule,
    Bootstrap4FrameworkModule
  ],
  declarations: [RedisComponent, RedisSettingsComponent]
})
export class RedisModule { }
