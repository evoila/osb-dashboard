import { Component, OnInit } from '@angular/core';
import { BackupService } from './backup.service';
import { Job } from './domain/job';
import { BackupPlan } from './domain/backup-plan';

@Component({
  selector: 'sb-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {
  jobs: Job[];
  plans: BackupPlan[];

  constructor(protected readonly backupService: BackupService) { }

  ngOnInit() {
    this.backupService
      .loadBackupPlans()
      .subscribe((plans: any) => {
        this.plans = plans.content;
      })

    this.backupService
      .loadRecentBackupJobs()
      .subscribe((jobs: any) => {
        this.jobs = jobs.content;
      })
  }

}
