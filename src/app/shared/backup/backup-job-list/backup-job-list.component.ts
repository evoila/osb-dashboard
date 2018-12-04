import { Component, OnInit } from '@angular/core';
import { BackupService } from '../backup.service';
import { BackupJob } from '../domain/backup-job';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '../domain/pagination';

@Component({
  selector: 'sb-backup-job-list',
  templateUrl: './backup-job-list.component.html',
  styleUrls: ['./backup-job-list.component.scss']
})
export class BackupJobListComponent implements OnInit {
  private pageSizes = [5, 10, 25, 50, 100, 250];
  private pagination: Pagination = {
    page: 1,
    collectionSize: 0,
    pageSize: 10,
    maxSize: 5,
    rotate: true,
    boundaryLinks: true
  };
  private jobs: BackupJob[];
  
  constructor(protected readonly backupService: BackupService,
    protected readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadJobs();
    });
  }

  pageChange(page?: number): void {
    if (page)
      this.pagination.page = page;
    this.loadJobs();
  }

  updateResponse(page: number, collectionSize: number): void {
    this.pagination.page = (page + 1);
    this.pagination.collectionSize = collectionSize;
  }

  private loadJobs() {
    this.backupService
      .loadAll('backupJobs', this.pagination)
      .subscribe((jobs: any) => {
        this.updateResponse(jobs.number, jobs.totalElements);        
          this.jobs = jobs.content;        
      });
  }

}
