import { Component, OnInit } from '@angular/core';
import { BackupService } from '../backup.service';
import { Job } from '../domain/job';

@Component({
  selector: 'sb-backup-job-list',
  templateUrl: './backup-job-list.component.html',
  styleUrls: ['./backup-job-list.component.scss']
})
export class BackupJobListComponent implements OnInit {
  jobs: Job[];
  
  constructor(protected readonly backupService: BackupService) { }

  ngOnInit() {
    this.loadJobs();
  }

  private loadJobs() {
    this.backupService
      .loadAll('jobs')
      .subscribe((jobs: any) => {
        this.jobs = jobs.content;
      });
  }

}
