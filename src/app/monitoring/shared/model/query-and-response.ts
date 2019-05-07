import { AggregationRequestObject } from '../../chart-configurator/model/aggregationRequestObject';
import { SearchResponse } from 'app/monitoring/model/search-response';
export interface QueryAndResponse {
    query: AggregationRequestObject;
    response: SearchResponse
}