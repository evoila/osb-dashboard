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

  job: Job;
  constructor(protected readonly backupService: BackupService,
              protected readonly route :ActivatedRoute) { }


 ngOnInit(): void {
     this.route.params.subscribe(params => {
       if(params['jobId']){
          this.backupService.loadBackupJob(params['jobId'] + "")
            .subscribe(
              (job: any) => {this.job = job},
            );
       }
    });
}

  public delete(){
    console.log("DELETE");
      this.backupService.
      delete("jobs", this.job).subscribe((jobs: any) => {
      })
  }
}
