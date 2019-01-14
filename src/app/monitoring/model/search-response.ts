import { LogDataModel } from './log-data-model';
export interface SearchResponse {
  took: number;
  timed_out: boolean;
  _shards: Map<string, any>;
  hits: Hits;
  aggregations?: any;
}
export interface Hits {
  total: number;
  max_score: number;
  hits: Array<LogDataModel>;
}
