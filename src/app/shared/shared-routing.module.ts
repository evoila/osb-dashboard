import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BackupComponent } from './backup/backup.component';
import { BackupPlanComponent } from './backup/backup-plan/backup-plan.component';
import { BackupJobComponent } from './backup/backup-job/backup-job.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
