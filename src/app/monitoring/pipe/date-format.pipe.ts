import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';
import { timestamp } from 'rxjs/operators/timestamp';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  private validFormats: Array<any> = ['DD/MM/YYYY', 'DD-MM-YYYY', 'DD.MM.YYYY', moment.ISO_8601];

  public transform(value: any, args?: any): any {
    value = typeof value === 'string' ? parseInt(value, 10) : value;
    if (value > 99999999999) {
      return this.transformMillis(value);
    }
    const momentTs = moment.unix(value);
    if (momentTs.isValid()) {
      const ts = momentTs.format('DD.MM.YYYY hh:mm:ss');

      return ts;
    }

    const parsed = moment(value, this.validFormats, true);

    if (!parsed || !parsed.isValid()) { return value; }

    return parsed.format('DD.MM.YYYY');
  }
  public transformMillis(value: any) {
    const momentTs = moment(value);
    if (momentTs.isValid()) {
      const ts = momentTs.format('DD.MM.YYYY hh:mm:ss');

      return ts;
    } else {
      return value;
    }
  }

}
