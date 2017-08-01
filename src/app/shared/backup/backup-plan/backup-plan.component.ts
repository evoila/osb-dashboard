import { Component, OnInit } from '@angular/core';
import { BackupService } from '../backup.service';

@Component({
  selector: 'sb-backup-plan',
  templateUrl: './backup-plan.component.html',
  styleUrls: ['./backup-plan.component.scss']
})
export class BackupPlanComponent implements OnInit {
  plan: any = {
    destination: {
    }
  }

  constructor(protected readonly backupService: BackupService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.backupService.save('backup', this.plan)
      .subscribe((job: any) => {
      });
  }

}
