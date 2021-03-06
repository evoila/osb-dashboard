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
import { FormBuilder } from "@angular/forms";
import { timezoneStringList } from "./timezones";

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
  // to manage file destination select value gets displayed correctly when displaying the form to edit a plan
  filedestinationInitialVal = "";
  displayFiledestinationSelect = true;
  timezoneStringList = timezoneStringList;

  constructor(
    private formBuilder: FormBuilder,
    protected readonly backupService: BackupService,
    protected readonly generalService: GeneralService,
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
    protected readonly notificationService: NotificationService,
    protected readonly modalService: NgbModal
  ) {}

  ngOnInit() {
    this.generalService
      .customLoadAll(
        "backup/" + this.generalService.getServiceInstanceId() + "/items"
      )
      .subscribe((result: any) => {
        this.itemList = result.content;
      });

    this.route.params.subscribe((params) => {
      /* EDITING A PLAN */
      if (params["planId"] && params["planId"] != "new") {
        this.update = true;
        this.backupService
          .loadOne(this.ENTITY, params["planId"])
          .subscribe((plan: any) => {
            this.plan = plan;
            this.fetchDestinations();
          });
      } else {
        /* CREATING NEW PLAN */
        // default values for new empty plan form
        this.plan.retentionStyle = "FILES";
        this.plan.timezone = "Europe/Berlin";
        this.fetchDestinations();
      }
    });
  }

  fetchDestinations() {
    this.backupService.loadAll("fileDestinations").subscribe((result: any) => {
      this.destinationList = result.content;
      // we want to load the plans filedestination into the filedestination select dropdown
      // and link the chosen select option to the plan obj model we pass to the server

      // find out if we are editing a plan
      if (this.plan["id"] != undefined) {
        // looping through all available file destinations
        this.destinationList.forEach((dest) => {
          // and detecting which one belongs to our plan we are editing
          if (dest.id == this.plan.fileDestination.id) {
            // this line writes the exact same value to fileDestination field
            // which it already has, because it's the plans filedestination
            // in order to make the form behave smoothly in all situations this is necessary
            this.plan.fileDestination = dest;
          }
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

  isCronSyntaxValid(): boolean {
    // cron string is only checked in backend atm
    return true;
    // code to check 6-part cron strings
    // the quality of this regex used to check in unprooved
    /*
    if (this.plan.frequency != undefined){
      const regex = new RegExp('^\s*($|#|\w+\s*=|(\?|\*|(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?(?:,(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?)*)\s+(\?|\*|(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?(?:,(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?)*)\s+(\?|\*|(?:[01]?\d|2[0-3])(?:(?:-|\/|\,)(?:[01]?\d|2[0-3]))?(?:,(?:[01]?\d|2[0-3])(?:(?:-|\/|\,)(?:[01]?\d|2[0-3]))?)*)\s+(\?|\*|(?:0?[1-9]|[12]\d|3[01])(?:(?:-|\/|\,)(?:0?[1-9]|[12]\d|3[01]))?(?:,(?:0?[1-9]|[12]\d|3[01])(?:(?:-|\/|\,)(?:0?[1-9]|[12]\d|3[01]))?)*)\s+(\?|\*|(?:[1-9]|1[012])(?:(?:-|\/|\,)(?:[1-9]|1[012]))?(?:L|W)?(?:,(?:[1-9]|1[012])(?:(?:-|\/|\,)(?:[1-9]|1[012]))?(?:L|W)?)*|\?|\*|(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?(?:,(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?)*)\s+(\?|\*|(?:[0-6])(?:(?:-|\/|\,|#)(?:[0-6]))?(?:L)?(?:,(?:[0-6])(?:(?:-|\/|\,|#)(?:[0-6]))?(?:L)?)*|\?|\*|(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?(?:,(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?)*)(|\s)+(\?|\*|(?:|\d{4})(?:(?:-|\/|\,)(?:|\d{4}))?(?:,(?:|\d{4})(?:(?:-|\/|\,)(?:|\d{4}))?)*))$');
      if(regex.test(this.plan.frequency)){
        return true;
      }
      return false;
    }
    return false;
*/
  }

  onSubmit(): void {
    if (!this.isCronSyntaxValid()) {
      this.notificationService.addSelfClosing(
        new Notification(
          NotificationType.Info,
          "Cron String Not Valid: please check your cron syntax to declare backup frequncy"
        )
      );
      return;
    }

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
          new Notification(NotificationType.Warning, e.error)
        );
      },
    });
  }

  private redirect(): void {
    this.router.navigate(["/backup/backup-plans"]);
  }

  get_cron_info_tooltip() {
    let rules =
      'syntax\t\tmeans\t\texample\t\t\texplanation\n--------------------------------------------------------------------------------\n*\t\t\tmatch any\t\t"* * * * * *"\t\tdo always\n*/x\t\t\tevery x\t\t"*/5 * * * * *"\t\tdo every five seconds\n?\t\t\tno spec\t\t"0 0 0 25 12 ?"\t\tdo every Christmas Day\n';
    let examples =
      '\nsyntax\t\t\t\t\tmeans\n--------------------------------------------------------------------------------\n"0 0 * * * *"\t\t\t\tthe top of every hour of every day.\n"*/10 * * * * *"\t\t\t\tevery ten seconds.\n"0 0 8-10 * * *"\t\t\t\t8, 9 and 10 o\'clock of every day.\n"0 0/30 8-10 * * *"\t\t\t8:00, 8:30, 9:00, 9:30 and 10 o\'clock every day.\n"0 0 9-17 * * MON-FRI"\t\ton the hour nine-to-five weekdays\n"0 0 0 25 12 ?"\t\t\t\tevery Christmas Day at midnight\n';
    return rules + examples;
  }
}
