import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BackupComponent } from './backup/backup.component';
import { BackupPlanComponent } from './backup/backup-plan/backup-plan.component';
import { BackupJobComponent } from './backup/backup-job/backup-job.component';
import { RestoreJobComponent } from './backup/restore-job/restore-job.component';
import { BackupJobDetailsComponent } from './backup/backup-job/backup-job-details/backup-job-details.component';

export const ROUTES = [
  {
    path: '',
    component: BackupComponent,
  },
  {
    path: 'backup/create-plan',
    component: BackupPlanComponent
  },
  {
    path: 'backup/create-job',
    component: BackupJobComponent
  },
  {
    path: 'backup/plan/:planId',
    component: BackupPlanComponent
  },
    {
    path: 'backup/job/:jobId',
    component: BackupJobDetailsComponent
  },
  {
    path: 'backup/create-restore',
    component: RestoreJobComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
