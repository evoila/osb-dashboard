import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  private validFormats: Array<any> = ['DD/MM/YYYY', 'DD-MM-YYYY', 'DD.MM.YYYY', moment.ISO_8601];

  public transform(value: any, args?: any): any {
    if (moment.unix(value).isValid()) { return moment.unix(value).format('DD.MM.YYYY hh:mm:ss'); }

    const parsed = moment(value, this.validFormats, true);

    if (!parsed || !parsed.isValid()) { return value; }

    return parsed.format('DD.MM.YYYY');
  }

}
