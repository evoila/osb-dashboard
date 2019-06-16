import { CfAuthScope } from './cfAuthScope';
import { Aggregation } from './aggregation';
export interface AggregationRequestObject {
  aggregation: Aggregation;
  appId?: string;
  authScope?: CfAuthScope;
  name?: string;
  size?: number;
  range?: { [id: string]: any };
  // just useful in frontend has to be removed later on
  index?: number;
}
