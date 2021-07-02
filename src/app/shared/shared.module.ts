import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BackupComponent } from './backup/backup.component';
import { ServiceKeysComponent } from './service-keys/service-keys.component';
import { RouterModule } from '@angular/router';
import { BackupService } from './backup/backup.service';
import { CoreModule } from '../core/core.module';
import { BackupPlanComponent } from './backup/backup-plan/backup-plan.component';
import { SharedRoutingModule } from './shared-routing.module';
import { RestoreJobComponent } from './backup/restore-job/restore-job.component';
import { FileEndpointComponent } from './backup/file-endpoint/file-endpoint.component';
import { GeneralComponent } from './general/general.component';
import { GeneralService } from './general/general.service';
import { ServiceKeysService } from './service-keys/service-keys.service';
import { ServiceKeysDetailComponent } from './service-keys/service-key-details/service-keys-detail.component';
import { BackupDashboardComponent } from './backup/backup-dashboard/backup-dashboard.component';
import { FileEndpointListComponent } from './backup/file-endpoint-list/file-endpoint-list.component';
import { BackupPlanListComponent } from './backup/backup-plan-list/backup-plan-list.component';
import { BackupJobListComponent } from './backup/backup-job-list/backup-job-list.component';
import { RestoreListComponent } from './backup/restore-list/restore-list.component';
import { BackupJobComponent } from './backup/backup-job/backup-job.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RestorePointListComponent } from './backup/restore-point-list/restore-point-list.component';
import { ServiceKeyListComponent } from './service-keys/service-key-list/service-key-list.component';
import { NotificationComponent } from './notification/notification.component';

const components = [
  GeneralComponent,
  ServiceKeysComponent,
  ServiceKeysDetailComponent,
  BackupComponent,
  BackupDashboardComponent,
  BackupPlanComponent,
  BackupPlanListComponent,
  BackupJobListComponent,
  BackupJobComponent,
  RestorePointListComponent,
  RestoreJobComponent,
  RestoreListComponent,
  FileEndpointComponent,
  FileEndpointListComponent,
  NotificationComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedRoutingModule,
    CoreModule,
    NgbPaginationModule
  ],
  declarations: [...components, ServiceKeyListComponent, NotificationComponent],
  exports: [components],
  providers: [BackupService, GeneralService, ServiceKeysService]
})
export class SharedModule { }
