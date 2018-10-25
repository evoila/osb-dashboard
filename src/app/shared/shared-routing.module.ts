import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BackupComponent } from './backup/backup.component';
import { BackupPlanComponent } from './backup/backup-plan/backup-plan.component';
import { RestoreJobComponent } from './backup/restore-job/restore-job.component';
import { BackupJobDetailsComponent } from './backup/backup-job/backup-job-details/backup-job-details.component';
import { FileEndpointComponent } from './backup/file-endpoint/file-endpoint.component';
import { GeneralComponent } from './general/general.component';
import { ServiceKeysComponent } from './service-keys/service-keys.component';
import { ServiceKeysDetailComponent } from './service-keys/service-key-details/service-keys-detail.component';
import { BackupDashboardComponent } from './backup/backup-dashboard/backup-dashboard.component';
import { BackupPlanListComponent } from './backup/backup-plan-list/backup-plan-list.component';
import { FileEndpointListComponent } from './backup/file-endpoint-list/file-endpoint-list.component';
import { BackupJobListComponent } from './backup/backup-job-list/backup-job-list.component';

export const ROUTES = [{
  path: '',
  component: GeneralComponent 
},
{
  path: 'backup',
  component: BackupComponent,
  children: [{
      path: '',
      component: BackupDashboardComponent,
      pathMatch: 'full'
    },
    {
      path: 'plans',
      component: BackupPlanListComponent
    },
    {
      path: 'plans/:planId',
      component: BackupPlanComponent
    },
    {
      path: 'jobs',
      component: BackupJobListComponent
    },
    {
      path: 'jobs/:jobId',
      component: BackupJobDetailsComponent
    },
    {
      path: 'file-endpoints',
      component: FileEndpointListComponent
    },
    {
      path: 'file-endpoints/:fileEndpointId',
      component: FileEndpointComponent
    },
    {
      path: 'create-restore',
      component: RestoreJobComponent
    },
  ]
},
{
  path: 'service-keys',
  component: ServiceKeysComponent,
  children: [
    {
      path: ':serviceKeyId',
      component: ServiceKeysDetailComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
