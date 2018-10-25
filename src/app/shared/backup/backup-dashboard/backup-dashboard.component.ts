import { Component, OnInit } from '@angular/core';
import { BackupService } from '../backup.service';
import { NotificationService } from 'app/core';
import { Job } from '../domain/job';
import { BackupPlan } from '../domain/backup-plan';
import { FileEndpoint } from '../domain/file-endpoint';

@Component({
  selector: 'sb-backup-dashboard',
  templateUrl: './backup-dashboard.component.html',
  styleUrls: ['./backup-dashboard.component.scss']
})
export class BackupDashboardComponent implements OnInit {
  jobs: Job[];
  plans: BackupPlan[];
  destinations: FileEndpoint[];
  
  constructor(protected readonly backupService: BackupService,
    protected readonly nService: NotificationService) { }

  ngOnInit() {
    this.loadPlans();
    this.loadJobs();
    this.loadDestinations();
  }

  private loadJobs() {
    this.backupService
      .loadAll('jobs')
      .subscribe((jobs: any) => {
        this.jobs = jobs.content;
      });
  }

  private loadDestinations() {
    this.backupService
      .loadAll('destinations')
      .subscribe((destinations: any) => {
        this.destinations = destinations.content;
      })
  }

  private loadPlans() {
    this.backupService
      .loadAll('plans')
      .subscribe((plans: any) => {
        this.plans = plans.content;
      });
  }

}