import { Component, OnInit } from '@angular/core';
import { BackupService } from '../backup.service';
import { Job } from '../domain/job';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sb-backup-job-list',
  templateUrl: './backup-job-list.component.html',
  styleUrls: ['./backup-job-list.component.scss']
})
export class BackupJobListComponent implements OnInit {
  withFilter: boolean = false;
  jobs: Job[];
  
  constructor(protected readonly backupService: BackupService,
    protected readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {      
      if (params['filter']) {
        this.withFilter = true;
      }
      this.loadJobs(this.withFilter);
    });
  }

  private loadJobs(withFilter: boolean) {
    this.backupService
      .loadAll('backupJobs')
      .subscribe((jobs: any) => {
        if (withFilter) 
          this.jobs = jobs.content.filter(job => job.status == "SUCCEEDED");
        else
          this.jobs = jobs.content;
      });
  }

}
