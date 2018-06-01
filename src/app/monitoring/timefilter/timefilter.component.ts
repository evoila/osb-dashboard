import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment/moment';

@Component({
  selector: 'sb-timefilter',
  templateUrl: './timefilter.component.html',
  styleUrls: ['./timefilter.component.scss']
})
export class TimefilterComponent implements OnInit {
  @Input('toDate')
  toDate: any;
  @Input('fromDate')
  fromDate: any;
  @Input('stepVal')
  stepVal: [string, string];
  @Input('activateStep')
  activateStep: boolean;
  @Output('fromDateChange')
  fromDateChange = new EventEmitter<number>();
  @Output('toDateChange')
  toDateChange = new EventEmitter<number>();
  @Output('stepChange')
  stepChange = new EventEmitter<[string, string]>();

  public isCollapsedFrom: boolean;
  public isCollapsedTo: boolean;

  public fromDateString;
  public toDateString;
  public step: string;
  public stepUnit: string;
  private toDateView: any;
  private fromDateView: any;

  stepUnits = ['s', 'm', 'h'];

  constructor() { }

  ngOnInit() {
    this.toDateString = moment.unix(this.toDate).format('DD:MM:YY, hh:mm:ss a');
    this.fromDateString = moment.unix(this.fromDate).format('DD:MM:YY, hh:mm:ss a');
    if (this.stepVal) {
      this.step = this.stepVal[0];
      this.stepUnit = this.stepVal[1];
    }
  }

  setFromDate() {
    if (this.isCollapsedFrom) {
      this.isCollapsedFrom = !this.isCollapsedFrom;
      this.fromDateString = this.getDateAsString(moment(this.fromDateView));
      this.fromDateChange.emit(moment(this.fromDateView).unix());
    }
  }
  setToDate() {
    if (this.isCollapsedTo) {
      this.isCollapsedTo = !this.isCollapsedTo;
      this.toDateString = this.getDateAsString(moment(this.toDateView));
      this.toDateChange.emit(moment(this.toDateView).unix());
    }
  }
  setSteps() {
    if (this.step && this.stepUnit) {
      this.stepChange.emit([this.step, this.stepUnit]);
    }
  }

  private getDateAsString(date: any): string {
    return moment(date).format('DD:MM:YY, hh:mm:ss a');
  }
}
