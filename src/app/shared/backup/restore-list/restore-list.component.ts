import { Component, OnInit } from '@angular/core';
import { RestoreJob } from '../domain/backup-job';
import { BackupService } from '../backup.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '../domain/pagination';

@Component({
  selector: 'sb-restore-list',
  templateUrl: './restore-list.component.html',
  styleUrls: ['./restore-list.component.scss']
})
export class RestoreListComponent implements OnInit {
  pageSizes = [10, 25, 50, 100, 250];
  pagination: Pagination = {
    page: 1,
    collectionSize: 0,
    pageSize: 10,
    maxSize: 5,
    rotate: true,
    boundaryLinks: true
  };
  jobs: RestoreJob[];
  
  constructor(protected readonly backupService: BackupService,
    protected readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.loadJobs();
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
      .loadAll('restoreJobs', this.pagination)
      .subscribe((jobs: any) => {
        this.jobs = jobs.content;
      });
  }
}

