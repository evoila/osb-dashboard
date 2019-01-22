import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'app/core/core.module';

import { PostgresqlComponent } from './postgresql.component';
import { PostgresqlRoutingModule } from './postgresql-routing.module';
import { PostgresqlUsersAndDatabasesComponent } from './postgresql-users-and-databases/postgresql-users-and-databases.component';
import { PostgresqlSettingsComponent } from './postgresql-settings/postgresql-settings.component';
import { PgpoolSettingsComponent } from './pgpool-settings/pgpool-settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    PostgresqlRoutingModule
  ],
  declarations: [PostgresqlComponent, PostgresqlUsersAndDatabasesComponent, PostgresqlSettingsComponent, PgpoolSettingsComponent]
})
export class PostgresqlModule { }
