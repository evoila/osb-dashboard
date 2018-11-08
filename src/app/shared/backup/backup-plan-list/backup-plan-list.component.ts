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
  backupPlans: BackupPlan[];
  
  constructor(protected readonly backupService: BackupService,
    protected readonly notificationService: NotificationService) { }

  ngOnInit() {
    this.loadPlans();
  }

  private loadPlans() {
    this.backupService
      .loadAll('backupPlans')
      .subscribe((backupPlans: any) => {
        this.backupPlans = backupPlans.content;
      });
  }

  startBackup(backupPlan: string, id: string) {
    this.backupService.saveOne({backupPlan: backupPlan}, 'backup')
      .subscribe({
        next: (d) => {
          this.notificationService.addSelfClosing(new Notification(NotificationType.Warning, 'Started Backup'));
          this.loadPlans()
        },
        error: (e) => {
          this.notificationService.addSelfClosing(new Notification(NotificationType.Warning, 'Could not start backup.'));
        }
      });
  }
}
