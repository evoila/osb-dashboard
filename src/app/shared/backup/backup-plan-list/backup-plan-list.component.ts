import { Component, OnInit } from '@angular/core';
import { BackupService } from '../backup.service';
import { BackupPlan } from '../domain/backup-plan';
import { NotificationService, NotificationType, Notification } from 'app/core';

@Component({
  selector: 'sb-backup-plan-list',
  templateUrl: './backup-plan-list.component.html',
  styleUrls: ['./backup-plan-list.component.scss']
})
export class BackupPlanListComponent implements OnInit {
  plans: BackupPlan[];
  
  constructor(protected readonly backupService: BackupService,
    protected readonly nService: NotificationService) { }

  ngOnInit() {
    this.loadPlans();
  }

  private loadPlans() {
    this.backupService
      .loadAll('plans')
      .subscribe((plans: any) => {
        this.plans = plans.content;
      });
  }

  startBackup(plan: string, id: string) {
    this.backupService.saveOne({plan: plan}, 'backup', id)
      .subscribe({
        next: (d) => {
          this.nService.add(new Notification(NotificationType.Warning, 'Started Backup'));
          this.loadPlans()
        },
        error: (e) => {
          this.nService.add(new Notification(NotificationType.Warning, 'Could not start backup.'));
        }
      });
  }
}
