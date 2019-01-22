import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LBaasComponent } from './lbaas.component';

import { CertificateComponent } from './certificate/certificate.component';
import { LetsencryptComponent } from './letsencrypt/letsencrypt.component';
import { SettingsComponent } from './settings/settings.component';

export const ROUTES = [
{
  path: '',
  component: LBaasComponent,
  children: [{
      path: '',
      component: SettingsComponent,
      pathMatch: 'full'
    },
    {
      path: 'certificates',
      component: CertificateComponent
    },
    {
      path: 'letsencrypt',
      component: LetsencryptComponent
    }]
}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class LBaasRoutingModule { }
