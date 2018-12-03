import { ChartOptions } from 'chart.js';
import { OptionsRequestObject } from 'app/monitoring/chart-configurator/model/options-request-object';

export class ChartOptionsEntity {
  public id?: string;
  public serviceInstanceId?: string;
  public space?: string;
  public org?: string;
  public public?: boolean;
  public options: ChartOptions;
  public chartTypes?: Array<string>;
  public name?: string;
}
