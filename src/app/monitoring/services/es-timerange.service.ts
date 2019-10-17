import { Injectable } from '@angular/core';
import { TimeService } from '../shared/services/time.service';

/* Service that creates a TimeRange Object used by Elastic Search */
@Injectable()
export class EsTimerangeService {
  constructor(private timeService: TimeService) { }

  public setTimeRange(start: number, end: number): { [key: string]: any } {
    return {
      timestamp: {
        gte: this.timeService.convertUnixToNumerical(start),
        lte: this.timeService.convertUnixToNumerical(end)
      }
    };
  }
}
