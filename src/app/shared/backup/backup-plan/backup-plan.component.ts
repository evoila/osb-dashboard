import { NotificationType } from "./../../../core/notification.service";
import { Component, OnInit } from "@angular/core";
import { BackupService } from "../backup.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NotificationService,
  Notification,
} from "../../../core/notification.service";
import { GeneralService } from "app/shared/general/general.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "sb-backup-plan",
  templateUrl: "./backup-plan.component.html",
  styleUrls: ["./backup-plan.component.scss"],
})
export class BackupPlanComponent implements OnInit {
  readonly ENTITY: string = "backupPlans";
  plan: any = {};
  destinationList: any = [];
  itemList: any = [];
  update = false;

  constructor(
    protected readonly backupService: BackupService,
    protected readonly generalService: GeneralService,
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
    protected readonly notificationService: NotificationService,
    protected readonly modalService: NgbModal
  ) {}

  ngOnInit() {
    this.backupService.loadAll("fileDestinations").subscribe((result: any) => {
      this.destinationList = result.content;
    });

    this.generalService
      .customLoadAll(
        "backup/" + this.generalService.getServiceInstanceId() + "/items"
      )
      .subscribe((result: any) => {
        this.itemList = result.content;
      });

    this.route.params.subscribe((params) => {
      if (params["planId"] && params["planId"] != "new") {
        this.update = true;
        this.backupService
          .loadOne(this.ENTITY, params["planId"])
          .subscribe((plan: any) => {
            this.plan = plan;
          });
      }
    });
  }

  delete(content): void {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.backupService
            .deleteOne(this.ENTITY, this.plan)
            .subscribe((plan: any) => {
              this.redirect();
            });
        },
        (reason) => {
          // we do nothing here, because user does not want to delete entity
        }
      );
  }

  onSubmit(): void {
    const id = this.update ? this.plan.id : null;
    this.plan.serviceInstance = this.backupService.getServiceInstance();
    this.backupService.saveOne(this.plan, this.ENTITY, id).subscribe({
      next: (d) => {
        this.notificationService.addSelfClosing(
          new Notification(NotificationType.Info, "Backup Plan Created")
        );
        this.redirect();
      },
      error: (e) => {
        this.notificationService.addSelfClosing(
          new Notification(
            NotificationType.Warning,
            "Could not create Backup Plan. Please check your entries."
          )
        );
      },
    });
  }

  private redirect(): void {
    this.router.navigate(["/backup/backup-plans"]);
  }

  get_cron_info_tooltip(){
    
    return '\nsyntax\t\t\t\t\t\tmeans\n----------------------------------------------------\n\"0 0 * * * *\"\t\t\t\tthe top of every hour of every day.\n\"*/10 * * * * *\"\t\t\t\tevery ten seconds.\n\"0 0 8-10 * * *\"\t\t\t\t8, 9 and 10 o\'clock of every day.\n\"0 0/30 8-10 * * *\"\t\t\t\t8:00, 8:30, 9:00, 9:30 and 10 o\'clock every day.\n\"0 0 9-17 * * MON-FRI\"\t\t\t\ton the hour nine-to-five weekdays\n\"0 0 0 25 12 ?\"\t\t\t\tevery Christmas Day at midnight\n'
    
  }

}
