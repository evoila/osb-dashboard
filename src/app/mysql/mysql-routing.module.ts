import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MysqlComponent } from './mysql.component';
import { MysqlSettingsComponent } from './mysql-settings/mysql-settings.component';
import { MysqlUsersAndDatabasesComponent } from './mysql-users-and-databases/mysql-users-and-databases.component';

export const ROUTES = [
  {
    path: '',
    component: MysqlComponent,
    children: [{
        path: '',
        component: MysqlSettingsComponent,
        pathMatch: 'full'
      },{
        path: 'mysql-users-and-dbs',
        component: MysqlUsersAndDatabasesComponent,
      }]
    }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class MysqlRoutingModule { }
