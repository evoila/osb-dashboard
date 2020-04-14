import { Action } from '@ngrx/store';
import { Chart } from '../../model/chart';
import { AggregationRequestObject } from '../../../chart-configurator/model/aggregationRequestObject';
import { SearchResponse } from 'app/monitoring/model/search-response';
import { Panel } from '../../model/panel';
export const SAVE_CHART = '[Chart] Save Chart';
export const SAVE_CHART_SUCCESS = '[Chart] Save Chart Success';
export const SAVE_CHART_FAIL = '[Chart] Save Chart Fail';

export const DELETE_CHART = '[Chart] Delete Chart';
export const DELETE_CHART_SUCCESS = '[Chart] Delete Chart success';
export const DELETE_CHART_FAIL = '[Chart] Delete Chart fail';


export const LOAD_CHARTS = '[Chart] Load Charts';
export const LOAD_CHARTS_SUCCESS = '[Chart] Load Charts Success';
export const LOAD_CHARTS_FAIL = '[Chart] Load Charts Failed';

export const FIRE_AGGREGATION_REQUEST = '[Chart] Fire Aggregation Request';
export const FIRE_PANEL_AGGREGATION_REQUEST = '[Chart] Fire Panel Aggregation Request';
export const FIRE_AGGREGATION_REQUEST_FAIL =
  '[Chart] Fire Aggregation Request Fail';
export const FIRE_AGGREGATION_REQUEST_SUCCESS =
  '[Chart] Fire Aggregation Request Success';



export class SaveChart implements Action {
  readonly type = SAVE_CHART;
  constructor(public payload: Chart) { }
}
export class SaveChartSuccess implements Action {
  readonly type = SAVE_CHART_SUCCESS;
  constructor(public payload: Chart) { }
}
export class SaveChartFail implements Action {
  readonly type = SAVE_CHART_FAIL;
}

export class DeleteChart implements Action {
  readonly type = DELETE_CHART;
  // payload must be a ledig, existing chart id
  constructor(public payload: string) { }
}
export class DeleteChartSuccess implements Action {
  readonly type = DELETE_CHART_SUCCESS;
  constructor(public payload: Chart) {} 
}
export class DeleteChartFail implements Action {
  readonly type = DELETE_CHART_FAIL;
}

export class LoadCharts implements Action {
  readonly type = LOAD_CHARTS;
}
export class LoadChartsSuccess implements Action {
  readonly type = LOAD_CHARTS_SUCCESS;
  constructor(public payload: Array<Chart>) { }
}
export class LoadChartsFail implements Action {
  readonly type = LOAD_CHARTS_FAIL;
}

export class FireAggregationRequest implements Action {
  readonly type = FIRE_AGGREGATION_REQUEST;
  constructor(
    public payload: Array<AggregationRequestObject>,
    public id: string
  ) { }
}

export class FirePanelAggregationRequest implements Action {
  readonly type = FIRE_PANEL_AGGREGATION_REQUEST;
  constructor(
    public payload: Panel,
    public range?: { [id: string]: any }
  ) { 
    console.log('FirePanelAggregationRequest panel payload');
    console.log(payload);
    console.log('FirePanelAggregationRequest range');
    console.log(range);
  }
}
export class FireAggregationRequestSuccess implements Action {
  readonly type = FIRE_AGGREGATION_REQUEST_SUCCESS;
  constructor(
    public payload: {
      [id: string]: Array<{
        response: SearchResponse;
        query: AggregationRequestObject;
      }>;
    }
  ) { }
}
export class FireAggregationRequestFail implements Action {
  readonly type = FIRE_AGGREGATION_REQUEST_FAIL;
}

export type ChartAction =
  | SaveChart
  | SaveChartSuccess
  | SaveChartFail
  | LoadCharts
  | LoadChartsSuccess
  | LoadChartsFail
  | FireAggregationRequest
  | FirePanelAggregationRequest
  | FireAggregationRequestSuccess
  | FireAggregationRequestFail
  | DeleteChart
  | DeleteChartFail
  | DeleteChartSuccess;
