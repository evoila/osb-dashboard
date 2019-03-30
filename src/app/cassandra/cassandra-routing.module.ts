import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CassandraComponent } from './cassandra.component';
import { CassandraSettingsComponent } from './cassandra-settings/cassandra-settings.component';

export const ROUTES = [
{
  path: '',
  component: CassandraComponent,
  children: [{
    path: '',
    component: CassandraSettingsComponent,
    pathMatch: 'full'
  }]
  }];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class CassandraRoutingModule { }
