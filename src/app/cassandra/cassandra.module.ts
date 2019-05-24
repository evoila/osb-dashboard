import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';

import { Bootstrap4FrameworkModule } from 'angular6-json-schema-form';
import { CassandraRoutingModule } from './cassandra-routing.module';
import { CassandraComponent } from './cassandra.component';
import { CassandraSettingsComponent } from './cassandra-settings/cassandra-settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    CassandraRoutingModule,
    Bootstrap4FrameworkModule
  ],
  declarations: [CassandraComponent, CassandraSettingsComponent] 
})

export class CassandraModule { }
