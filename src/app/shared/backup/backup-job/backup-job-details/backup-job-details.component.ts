import { Component, OnInit } from '@angular/core';
import { BackupService } from '../../backup.service';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../../domain/job';
@Component({
  selector: 'sb-backup-job-details',
  templateUrl: './backup-job-details.component.html',
  styleUrls: ['./backup-job-details.component.scss']
})
export class BackupJobDetailsComponent implements OnInit {

  job: Job[];
  ID ='8c0e3edc-ac90-4151-be8a-d6b1975058f5';
  constructor(protected readonly backupService: BackupService,
              protected readonly route :ActivatedRoute) { }


 ngOnInit(): void {
     this.route.params.subscribe(params => {
       if(params['jobId']){
          this.backupService.loadBackupJob(this.ID, params['jobId']+ "")
            .subscribe(
              (job: any) => {this.job = job},
            );
       }
    });
}

  public delete(){
    console.log("DELETE");
      this.backupService.
      delete(this.ID, "jobs", this.job).subscribe((jobs: any) => {
      })
  }
}
