import { Component, OnInit } from '@angular/core';
import { BackupService } from '../backup.service';
import { FileEndpoint } from '../domain/file-endpoint';
import { Pagination } from '../domain/pagination';

@Component({
  selector: 'sb-file-endpoint-list',
  templateUrl: './file-endpoint-list.component.html',
  styleUrls: ['./file-endpoint-list.component.scss']
})
export class FileEndpointListComponent implements OnInit {
  destinations: FileEndpoint[];
  pageSizes = [10, 25, 50, 100, 250];
  pagination: Pagination = {
    page: 1,
    collectionSize: 0,
    pageSize: 10,
    maxSize: 5,
    rotate: true,
    boundaryLinks: true
  };
  
  constructor(protected readonly backupService: BackupService) { }

  ngOnInit() {
    this.loadDestinations();
  }

  pageChange(page?: number): void {
    if (page)
      this.pagination.page = page;
    this.loadDestinations();
  }

  updateResponse(page: number, collectionSize: number): void {
    this.pagination.page = (page + 1);
    this.pagination.collectionSize = collectionSize;
  }

  private loadDestinations() {
    this.backupService
    .loadAll('fileDestinations', this.pagination)
      .subscribe((destinations: any) => {
        this.destinations = destinations.content;
        //console.log(this.destinations);
      })
  }
}
