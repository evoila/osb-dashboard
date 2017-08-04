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
import { JobFormComponent } from './backup/backup-job/job-form/job-form.component';
import { PlanFormComponent } from './backup/backup-plan/plan-form/plan-form.component';
import { BackupJobDetailsComponent } from './backup/backup-job/backup-job-details/backup-job-details.component';
import { RestoreJobComponent } from './backup/restore-job/restore-job.component';

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
  declarations: [...components, JobFormComponent, PlanFormComponent, BackupJobDetailsComponent, RestoreJobComponent, ],
  exports: [components],
  providers: [BackupService]
})
export class SharedModule { }
