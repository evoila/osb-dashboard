import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MysqlComponent } from './mysql.component';
import { MysqlRoutingModule } from './mysql-routing.module';
import { MysqlSettingsComponent } from './mysql-settings/mysql-settings.component';
import { MysqlUsersAndDatabasesComponent } from './mysql-users-and-databases/mysql-users-and-databases.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    MysqlRoutingModule
  ],
  declarations: [MysqlComponent, MysqlSettingsComponent, MysqlUsersAndDatabasesComponent]
})
export class MysqlModule { }
