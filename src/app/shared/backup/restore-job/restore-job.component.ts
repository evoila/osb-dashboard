import { Component, OnInit } from '@angular/core';
import { BackupService } from '../backup.service';
import { Job } from '../domain/job';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService, NotificationType, Notification } from 'app/core';

@Component({
  selector: 'sb-restore-job',
  templateUrl: './restore-job.component.html',
  styleUrls: ['./restore-job.component.scss']
})
export class RestoreJobComponent implements OnInit {
  readonly ENTITY = 'restoreJobs';
  job: Job | any = {};

  constructor(protected readonly backupService: BackupService,
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
    protected readonly notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['restoreId']) {
        this.backupService.loadOne(this.ENTITY, params['restoreId'])
          .subscribe((job: any) => { 
              console.log(job)
              this.job = job;
            }
          );
      }
    });
  }
  
  restore(backupJob, item: string, file: string) {
    let restoreRequest = {
      backupJob: backupJob,
      items: [{
        item: item,
        filename: file
      }]
    };

    this.backupService.saveOne(restoreRequest, 'restore')
    .subscribe({
      next: (d) => {
        this.notificationService.addSelfClosing(new Notification(NotificationType.Warning, 'Started Restore'));
      },
      error: (e) => {
        this.notificationService.addSelfClosing(new Notification(NotificationType.Warning, 'Could not start restore.'));
      }
    });
  }
}
