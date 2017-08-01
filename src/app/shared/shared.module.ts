import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackupComponent } from './backup/backup.component';
import { ServiceKeysComponent } from './service-keys/service-keys.component';
import { NoContentComponent } from './no-content/no-content.component';
import { RouterModule } from '@angular/router';
import { BackupService } from './backup/backup.service';
import { CoreModule } from '../core/core.module';
import { BackupPlanComponent } from './backup/backup-plan/backup-plan.component';
import { BackupJobComponent } from './backup/backup-job/backup-job.component';
import { SharedRoutingModule } from './shared-routing.module';

const components = [BackupComponent,
  ServiceKeysComponent,
  NoContentComponent,
  BackupPlanComponent,
  BackupJobComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedRoutingModule,
    CoreModule
  ],
  declarations: [...components, ],
  exports: [components],
  providers: [BackupService]
})
export class SharedModule { }
