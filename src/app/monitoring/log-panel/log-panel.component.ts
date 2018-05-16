import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment';

@Component({
  selector: 'sb-log-panel',
  templateUrl: './log-panel.component.html',
  styleUrls: ['./log-panel.component.scss']
})
export class LogPanelComponent implements OnInit {
  public appId: string;
  public query: string;
  public toDate: any;
  public fromDate: any;


  constructor() { }
  ngOnInit() {
    this.toDate = moment();
    this.fromDate = moment(this.toDate).subtract(5, 'minutes');
  }

  setAppId(appId: string) {
    this.appId = appId;
  }
  getLogs() {
    if (!this.query) {
      

    }
  }
}
