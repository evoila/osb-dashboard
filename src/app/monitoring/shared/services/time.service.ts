import { Injectable } from "@angular/core";
import * as moment from "moment";
import { timestamp } from 'rxjs/operators';

// Services that handels time related stuff 
// Important because we want to be able to support Millisecond Timestamps and Nano Second Timestamp
// Switch happens in this file by selecting one of the enums. Every other Component and Service that handles 
// Time must be using this service to convert things 
@Injectable()
export class TimeService {

    private readonly timeFormat = TimestampFormat.millis;
    /* 
     Methode to convert Moment JS Object to the Numeric Timestamp of choice 
      @param timestamp Moment JS Object
      @returns a timestamp as number in either milli or nanoseconds
    */
    getNumericalTimestamp(timestamp: any): number {
        const milliseconds = timestamp.valueOf();
        if (this.timeFormat === TimestampFormat.millis) {
            return milliseconds;
        } else {
            // Multiply by one Million since moment doesn't support nanoseconds yet
            return milliseconds * 1000 * 1000;
        }
    }

    /* 
     Methode to convert a numeric timestamp to a moment JS Object
      @param timestamp as number in either milli, nanoseconds or seconds (more an error handling than anything else)
      @returns Moment JS Object
    */
    getMomentJsObject(timestamp: number): any {
        // check wether this is a unix timestamp smaller then Sep 2001 in Millis must be a unix timestamp
        if (timestamp < 1000000000000) {
            return moment.unix(timestamp);
        }
        else if (this.timeFormat === TimestampFormat.millis) {
            return moment(timestamp);
        } else {
            return moment(timestamp / 1000 / 1000);
        }
    }
    /* 
      Methode to convert a unix timestamp to a milli or nanosecond timestamp
      @param timestamp as number in seconds
      @returns a timestamp as number in either milli or nanoseconds
    */
    convertUnixToNumerical(timestamp: number): number {
        if (timestamp < 1000000000000) {
            const milliseconds = moment.unix(timestamp).valueOf();
            if (this.timeFormat === TimestampFormat.millis) {
                return milliseconds;
            } else {
                // Multiply by one Million since moment doesn't support nanoseconds yet
                return milliseconds * 1000 * 1000;
            }
        } else {
            throw new Error("Provided timestamp is not a unix (second) timestamp");
        }
    }

}

// Specifies the format of the timestamp wanted by ES 
enum TimestampFormat {
    millis,
    nanos
}