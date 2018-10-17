import { Component, OnInit } from '@angular/core';
import { BackupService } from '../backup.service';
import { FileEndpoint } from '../domain/file-endpoint';

@Component({
  selector: 'sb-file-endpoint-list',
  templateUrl: './file-endpoint-list.component.html',
  styleUrls: ['./file-endpoint-list.component.scss']
})
export class FileEndpointListComponent implements OnInit {
  destinations: FileEndpoint[];

  constructor(protected readonly backupService: BackupService) { }

  ngOnInit() {
    this.loadDestinations();
  }

  private loadDestinations() {
    this.backupService
      .loadAll('destinations')
      .subscribe((destinations: any) => {
        this.destinations = destinations.content;
      })
  }
}
