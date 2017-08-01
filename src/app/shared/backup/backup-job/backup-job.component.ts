import { Component, OnInit } from '@angular/core';
import { BackupService } from '../backup.service';
import { Job } from '../domain/job';

@Component({
  selector: 'sb-backup-job',
  templateUrl: './backup-job.component.html',
  styleUrls: ['./backup-job.component.scss']
})
export class BackupJobComponent implements OnInit {
  request: any = {
    destination: {
    }
  }
  job: Job;

  constructor(protected readonly backupService: BackupService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.backupService.save('backup', this.request)
      .subscribe((job: any) => {
      });
  }

}
