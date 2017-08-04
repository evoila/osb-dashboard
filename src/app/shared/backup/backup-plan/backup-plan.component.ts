import { Component, OnInit } from '@angular/core';
import { BackupService } from '../backup.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'sb-backup-plan',
  templateUrl: './backup-plan.component.html',
  styleUrls: ['./backup-plan.component.scss']
})
export class BackupPlanComponent implements OnInit {
  plan: any = { destination: {} }
  update = false;
  ID = '8c0e3edc-ac90-4151-be8a-d6b1975058f5';
  constructor(protected readonly backupService: BackupService,
              protected readonly route :ActivatedRoute,
              protected readonly router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['planId']);
       if(params['planId']){
         this.update = true;
          this.backupService.loadBackupPlan(this.ID, params['planId']+ "")
            .subscribe(
              (plan: any) => { this.plan = plan},
            );
       }
    });

  }

  delete() {
    this.backupService.delete(this.ID, "plans", this.plan)
      .subscribe((plan: any) => {

      });
    this.router.navigate(["/backup"]);
  }

  onSubmit() {
    if(this.update){
      this.backupService.update(this.ID, 'plans', this.plan)
      .subscribe((plan: any) => {
        });
    } else {
      this.backupService.save(this.ID, 'plans', this.plan)
        .subscribe((plan: any) => {
        });
    }
  }

}
