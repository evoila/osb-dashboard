import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostgresqlComponent } from './postgresql.component';
import { PostgresqlUsersAndDatabasesComponent } from './postgresql-users-and-databases/postgresql-users-and-databases.component';
import { PostgresqlSettingsComponent } from './postgresql-settings/postgresql-settings.component';
import { PgpoolSettingsComponent } from './pgpool-settings/pgpool-settings.component';

export const ROUTES = [
  {
    path: '',
    component: PostgresqlComponent,
    children: [{
        path: '',
        component: PostgresqlSettingsComponent,
        pathMatch: 'full'
      },{
        path: 'postgresql-users-and-dbs',
        component: PostgresqlUsersAndDatabasesComponent,
      },{
        path: 'pgpool-settings',
        component: PgpoolSettingsComponent
      }]
    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class PostgresqlRoutingModule { }
