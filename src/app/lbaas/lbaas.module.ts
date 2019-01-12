import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';

import { LBaasComponent } from './lbaas.component';
import { LBaasService } from './lbaas.service';

import { Bootstrap4FrameworkModule } from 'angular6-json-schema-form';

import { LBaasRoutingModule } from './lbaas-routing.module';

import { CertificateComponent } from './certificate/certificate.component';
import { LetsencryptComponent } from './letsencrypt/letsencrypt.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    LBaasRoutingModule,
    Bootstrap4FrameworkModule
  ],
  declarations: [LBaasComponent, CertificateComponent, LetsencryptComponent, SettingsComponent],
  providers: [LBaasService]
})
export class LBaasModule { }
