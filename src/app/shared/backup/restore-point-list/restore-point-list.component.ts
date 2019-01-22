import { Component, OnInit } from '@angular/core';
import { BackupService } from '../backup.service';
import { ActivatedRoute } from '@angular/router';
import { BackupJob } from '../domain/backup-job';
import { Pagination } from '../domain/pagination';

@Component({
  selector: 'sb-restore-point-list',
  templateUrl: './restore-point-list.component.html',
  styleUrls: ['./restore-point-list.component.scss']
})
export class RestorePointListComponent implements OnInit {
  pageSizes = [10, 25, 50, 100, 250];
  pagination: Pagination = {
    page: 1,
    collectionSize: 0,
    pageSize: 10,
    maxSize: 5,
    rotate: true,
    boundaryLinks: true
  };
  jobs: BackupJob[];

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
      .loadAllFiltered('backupJobs', { jobStatus : 'SUCCEEDED'}, this.pagination)
      .subscribe((jobs: any) => {
        this.updateResponse(jobs.number, jobs.totalElements);
        this.jobs = jobs.content;
      });
  }
}
