import { NgModule } from '@angular/core';
import { Route, RouterModule, ActivatedRouteSnapshot } from '@angular/router';

import {
  HomeComponent
} from './core';

// needs to be exported for AOT
export const ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
