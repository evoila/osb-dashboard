import { Component, OnInit } from '@angular/core';
import { Job } from '../domain/job';
import { BackupService } from '../backup.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sb-restore-list',
  templateUrl: './restore-list.component.html',
  styleUrls: ['./restore-list.component.scss']
})
export class RestoreListComponent implements OnInit {
  jobs: Job[];
  
  constructor(protected readonly backupService: BackupService,
    protected readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.loadJobs();
  }

  private loadJobs() {
    this.backupService
      .loadAll('restoreJobs')
      .subscribe((jobs: any) => {
        this.jobs = jobs.content;
      });
  }
}

