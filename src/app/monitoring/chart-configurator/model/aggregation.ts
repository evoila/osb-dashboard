import { CfAuthScope } from './cfAuthScope';
export interface Aggregation {
  id?: string;
  public: boolean;
  name: string;
  description?: string;
  actualAggregation: any;
  authScope: CfAuthScope;
  chartTypes: Array<string>;
  index?: string;
}
