import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RedisComponent } from './redis.component';
import { RedisSettingsComponent } from './redis-settings/redis-settings.component';

export const ROUTES = [
{
  path: '',
  component: RedisComponent,
  children: [{
    path: '',
    component: RedisSettingsComponent,
    pathMatch: 'full'
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RedisRoutingModule { }
