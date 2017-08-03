import { Component, OnInit } from '@angular/core';
import {BackupService} from "../backup.service";

@Component({
  selector: 'sb-restore-job',
  templateUrl: './restore-job.component.html',
  styleUrls: ['./restore-job.component.scss']
})
export class RestoreJobComponent implements OnInit {

  request: any = { source: {} }

  constructor(protected readonly backupService: BackupService) { }

  ngOnInit() {
  }

  onSubmit() {

    this.backupService.save('/8c0e3edc-ac90-4151-be8a-d6b1975058f5', 'restore',this.request)
      .subscribe((job: any) => {
      });
  }
}
