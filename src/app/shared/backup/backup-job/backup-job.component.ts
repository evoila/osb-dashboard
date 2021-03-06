import { Component, OnInit } from '@angular/core';
import { BackupService } from '../backup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BackupJob } from '../domain/backup-job';

@Component({
  selector: 'sb-backup-job',
  templateUrl: './backup-job.component.html',
  styleUrls: ['./backup-job.component.scss']
})
export class BackupJobComponent implements OnInit {
  readonly ENTITY = 'backupJobs';
  job: BackupJob | any = {};

  constructor(protected readonly backupService: BackupService,
    protected readonly route: ActivatedRoute,
    protected readonly router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['jobId']) {
        this.backupService.loadOne(this.ENTITY, params['jobId'])
          .subscribe(
            (job: any) => { this.job = job },
          );
      }
    });
  }

  public delete() {
    this.backupService.deleteOne(this.ENTITY, this.job).subscribe((jobs: any) => {
      this.router.navigate(['/backup']);
    });
  }
}
