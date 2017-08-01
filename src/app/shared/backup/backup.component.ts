import { Component, OnInit } from '@angular/core';
import { BackupService } from './backup.service';

@Component({
  selector: 'sb-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {

  constructor(backupService: BackupService) { }

  ngOnInit() {
  }

}
