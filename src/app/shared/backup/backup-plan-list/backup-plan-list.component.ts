import {
  Notification,
  NotificationService,
  NotificationType,
} from "./../../../core/notification.service";
import { Component, OnInit } from "@angular/core";
import { BackupService } from "../backup.service";
import { BackupPlan } from "../domain/backup-plan";

import { Pagination } from "../domain/pagination";

@Component({
  selector: "sb-backup-plan-list",
  templateUrl: "./backup-plan-list.component.html",
  styleUrls: ["./backup-plan-list.component.scss"],
})
export class BackupPlanListComponent implements OnInit {
  pageSizes = [10, 25, 50, 100, 250];
  pagination: Pagination = {
    page: 1,
    collectionSize: 0,
    pageSize: 10,
    maxSize: 5,
    rotate: true,
    boundaryLinks: true,
  };
  backupPlans: BackupPlan[];

  constructor(
    protected readonly backupService: BackupService,
    protected readonly notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadPlans();
  }

  pageChange(page?: number): void {
    if (page) this.pagination.page = page;
    this.loadPlans();
  }

  updateResponse(page: number, collectionSize: number): void {
    this.pagination.page = page + 1;
    this.pagination.collectionSize = collectionSize;
  }

  private loadPlans() {
    this.backupService
      .loadAll("backupPlans", this.pagination)
      .subscribe((backupPlans: any) => {
        this.backupPlans = backupPlans.content;
      });
  }

  startBackup(backupPlan: string, id: string) {
    this.backupService.saveOne({ backupPlan: backupPlan }, "backup").subscribe({
      next: (d) => {
        this.notificationService.addSelfClosing(
          new Notification(NotificationType.Warning, "Started Backup")
        );
        this.loadPlans();
      },
      error: (e) => {
        this.notificationService.addSelfClosing(
          new Notification(NotificationType.Warning, "Could not start backup.")
        );
      },
    });
  }
}
