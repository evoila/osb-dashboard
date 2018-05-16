import { LogDataModel } from './log-data-model';
export interface SearchResponse {
    took: number;
    timed_out: boolean;
    _shards: Map<string, any>;
    hits: Hits;
  }
  export interface Hits {
    total: number;
    max_score: 1.0;
    hits: Array<LogDataModel>;
  }
