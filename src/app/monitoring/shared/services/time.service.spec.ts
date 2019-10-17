import { TestBed, inject } from '@angular/core/testing';
import { SearchService } from './search.service';
import { TimeService, TimestampFormat } from './time.service';
import * as moment from "moment";
import { timestamp } from 'rxjs/operators';

describe('TimeService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SearchService]
        })
    });

    it('should convert a unix timestamp to a moment JS Object', inject([TimeService], (service: TimeService) => {
        const timeStamp = moment().unix();
        const momentJSObject = service.getMomentJsObject(timeStamp);
        expect(momentJSObject.unix()).toBe(timestamp)
    }));

    it('should convert a timestamp from db (milli or nano) to a moment JS Object', inject([TimeService], (service: TimeService) => {
        let timeStamp = moment().valueOf();
        // Compiler doesn't like this since it's static but we want to 
        // change this thing later on so it makes sense for us anyway
        if (service.timeFormat === TimestampFormat.nanos) {
            timeStamp *= 1000 * 1000;
            const momentJSObject = service.getMomentJsObject(timeStamp);
            expect(momentJSObject.valueOf() * 1000 * 1000).toBe(timeStamp);
        } else {
            const momentJSObject = service.getMomentJsObject(timeStamp);
            expect(momentJSObject.valueOf()).toBe(timeStamp);
        }
    }));

    it('should convert a moment JS Object to the Dateformat of the DB', inject([TimeService], (service: TimeService) => {
        const momentJS = moment();
        const numericalTs = service.getNumericalTimestamp(momentJS);
        // Compiler doesn't like this since it's static but we want to 
        // change this thing later on so it makes sense for us anyway
        if (service.timeFormat === TimestampFormat.nanos) {
            expect(momentJS.valueOf() * 1000 * 1000).toBe(numericalTs);
        } else {
            expect(momentJS.valueOf()).toBe(numericalTs);
        }

    }));

    it('should convert a unix Timestamp to the Dateformat of the DB', inject([TimeService], (service: TimeService) => {
        const unixTS = moment().unix();
        const dbTS = service.convertUnixToNumerical(unixTS);
        // Compiler doesn't like this since it's static but we want to 
        // change this thing later on so it makes sense for us anyway
        if (service.timeFormat === TimestampFormat.nanos) {
            expect(dbTS).toBe(moment.unix(unixTS).valueOf() * 1000 * 1000)
        } else {
            expect(dbTS).toBe(moment.unix(unixTS).valueOf());
        }
    }));

    it('should raise an exception when we provide a non Unix TS', inject([TimeService], (service: TimeService) => {
        const milliTimeStamp = moment().valueOf();
        expect(service.convertUnixToNumerical(milliTimeStamp)).toThrowError();
    }));

})