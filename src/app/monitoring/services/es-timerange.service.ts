import { Injectable } from '@angular/core';

@Injectable()
export class EsTimerangeService {
  constructor() {}

  public setTimeRange(start: number, end: number): { [key: string]: any } {
    return {
      timestamp: {
        gte: start * 1000,
        lte: end * 1000
      }
    };
  }
}
