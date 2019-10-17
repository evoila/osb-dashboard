import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment/moment';
import { NgbTimeStruct, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { SafeMethodCall } from '@angular/compiler';

/* This Component is a Datepicker it returns Unix Timestamps (in Seconds)
  via it's outputs be aware that you MUST use the TimeService to 
  convert it to an ES compatible Timestamp*/

@Component({
  selector: 'sb-timefilter',
  templateUrl: './timefilter.component.html',
  styleUrls: ['./timefilter.component.scss'],
  providers: [NgbTimepickerConfig]
})
export class TimefilterComponent {
  @Input('toDate')
  set toDate(date: any) {
    this.initializeDate(date, 'to');
  }

  @Input('fromDate')
  set fromDate(date: any) {
    this.initializeDate(date, 'from');
  }

  @Output('fromDateChange')
  fromDateChange = new EventEmitter<number>();
  @Output('toDateChange')
  toDateChange = new EventEmitter<number>();

  public isCollapsedFrom: boolean;
  public isCollapsedTo: boolean;
  // Stores the Date only
  public fromDateModel: { year: number, month: number, day: number };
  public toDateModel: { year: number, month: number, day: number };

  // Stores the Time only couldn't be merged together cause two different component inputs
  public fromTimeModel: NgbTimeStruct = { hour: 13, minute: 30, second: 0 };
  public toTimeModel: NgbTimeStruct = { hour: 13, minute: 30, second: 0 };

  // Restricts the timepickers step to this speciefied value
  public readonly minuteStep = 10;
  public step: string;
  public stepUnit: string;



  stepUnits = ['s', 'm', 'h'];

  constructor(config: NgbTimepickerConfig) {
    config.size = "small";
  }

  private initializeDate(date: any, fieldToBeSet: string) {
    const intermediate = moment.unix(date).format('DD:MM:YYYY:HH:MM');
    const resultObj = intermediate.split(':').reduce((prev: any, curr: string, index: number, ar: string[]) => {
      switch (index) {
        case (0): {
          return { date: { 'day': +curr } };
        }
        case (1): {
          return { date: { ...prev.date, 'month': +curr } };
        }
        case (2): {
          return { date: { ...prev.date, 'year': +curr } };
        }
        case (3): {
          return { ...prev, time: { 'hour': +curr } }
        }
        case (4): {
          return { ...prev, time: { ...prev.time, 'minute': +curr } }
        }
      }
    }, {});
    this[fieldToBeSet + 'DateModel'] = resultObj.date;
    this[fieldToBeSet + 'TimeModel'] = resultObj.time;
  }

  toggleTimeChange(event: NgbTimeStruct, source: 'To' | 'From') {
    const variableHandle = `${source.toLowerCase()}`;
    this[variableHandle + 'TimeModel'] = event;
    this[`set${source}DateChange`](this[variableHandle + 'DateModel']);
  }

  setToDateChange(event: { year: number, month: number, day: number }) {
    this.toDateModel = event;
    const { hour, minute } = this.toTimeModel;
    const formatedDate = moment(`${event.day}:${event.month}:${event.year}:${hour}:${minute}`, 'DD:MM:YYYY:HH:MM');
    this.toDateChange.next(formatedDate.unix());
  }

  setFromDateChange(event: { year: number, month: number, day: number }) {
    this.fromDateModel = event;
    const { hour, minute } = this.fromTimeModel;
    const formatedDate = moment(`${event.day}:${event.month}:${event.year}:${hour}:${minute}`, 'DD:MM:YYYY:HH:MM');
    this.fromDateChange.next(formatedDate.unix());
  }
}
