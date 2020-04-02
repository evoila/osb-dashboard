
//import { LogDataModel } from "app/monitoring/model/log-data-model";


export interface ESBoolQueryRawResponseMap {
  responses: Array<ESBoolQueryResponse>;
  queryId: string;

}


export interface ESBoolQueryResponse {
    took: number;
    timed_out: boolean;
    _shards: Map<string, any>;
    hits: Hits;
    aggregations?: any;
  }
  export interface Hits {
    total: number;
    max_score: number;
    hits: Array<any>; // any has to be replaced by something like LogDataModel
  }
  