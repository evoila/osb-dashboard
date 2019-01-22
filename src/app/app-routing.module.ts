import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { buildTarget } from 'environments/target';

import { BackupComponent, ServiceKeysComponent, GeneralComponent } from './shared';


// needs to be exported for AOT
export const ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: GeneralComponent
  },
  {
    path: 'backup',
    component: BackupComponent
  },
  {
    path: 'service-keys',
    component: ServiceKeysComponent
  },
  ...buildTarget.extensionModules,
  {
    path: '**',
    component: GeneralComponent
  },
];
@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
