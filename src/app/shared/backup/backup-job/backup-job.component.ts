import { Component, OnInit } from '@angular/core';
import { BackupService } from '../backup.service';

@Component({
  selector: 'sb-backup-job',
  templateUrl: './backup-job.component.html',
  styleUrls: ['./backup-job.component.scss']
})
export class BackupJobComponent implements OnInit {
  request: any = { destination: {} }

  constructor(protected readonly backupService: BackupService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.backupService.save('/8c0e3edc-ac90-4151-be8a-d6b1975058f5/backup', this.request)
      .subscribe((job: any) => {
      });
  }

}
