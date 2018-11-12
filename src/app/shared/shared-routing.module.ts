import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BackupComponent } from './backup/backup.component';
import { BackupPlanComponent } from './backup/backup-plan/backup-plan.component';
import { RestoreJobComponent } from './backup/restore-job/restore-job.component';
import { FileEndpointComponent } from './backup/file-endpoint/file-endpoint.component';
import { GeneralComponent } from './general/general.component';
import { ServiceKeysComponent } from './service-keys/service-keys.component';
import { ServiceKeysDetailComponent } from './service-keys/service-key-details/service-keys-detail.component';
import { BackupDashboardComponent } from './backup/backup-dashboard/backup-dashboard.component';
import { BackupPlanListComponent } from './backup/backup-plan-list/backup-plan-list.component';
import { FileEndpointListComponent } from './backup/file-endpoint-list/file-endpoint-list.component';
import { BackupJobListComponent } from './backup/backup-job-list/backup-job-list.component';
import { RestoreListComponent } from './backup/restore-list/restore-list.component';
import { BackupJobComponent } from './backup/backup-job/backup-job.component';
import { RestorePointListComponent } from './backup/restore-point-list/restore-point-list.component';

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
      path: 'backup-plans',
      component: BackupPlanListComponent
    },
    {
      path: 'backup-plans/:planId',
      component: BackupPlanComponent
    },
    {
      path: 'backup-jobs',
      component: BackupJobListComponent
    },
    {
      path: 'backup-jobs/:jobId',
      component: BackupJobComponent
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
      path: 'restore-points/:filter',
      component: RestorePointListComponent
    },
    {
      path: 'restore-jobs',
      component: RestoreListComponent
    },
    {
      path: 'restore-jobs/:restoreId',
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
