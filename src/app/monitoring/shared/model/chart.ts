import { CfAuthScope } from '../../chart-configurator/model/cfAuthScope';
import { ChartOptionsEntity } from '../../chart-configurator/model/chart-options-entity';
import { AggregationRequestObject } from '../../chart-configurator/model/aggregationRequestObject';
export class Chart {
  readonly id?: string;
  name: string;
  authScope: CfAuthScope;
  type: string;
  option: ChartOptionsEntity;
  aggregations: Array<AggregationRequestObject>;
  encodedImage: string;
}
