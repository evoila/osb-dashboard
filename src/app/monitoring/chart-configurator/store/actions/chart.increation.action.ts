import { Action } from '@ngrx/store';
import { ChartOptionsEntity } from '../../model/chart-options-entity';
export const SET_CHART_TYPE = '[Increation] Set Chart Type';
export const SET_CHART_OPTIONS = '[Increation] Set Chart Options';
export const SET_CHART_AGGREGATIONS = '[Increation] Set Chart Aggregations';

export class SetChartType implements Action {
  readonly type = SET_CHART_TYPE;
  constructor(public payload: string) {}
}
export class SetChartOptions implements Action {
  readonly type = SET_CHART_OPTIONS;
  constructor(public payload: ChartOptionsEntity) {}
}
export class SetChartAggregations implements Action {
  readonly type = SET_CHART_AGGREGATIONS;
  // Todo implement Datastructure
  constructor(public payload: Array<any>) {}
}

export type ChartIncreationAction =
  | SetChartType
  | SetChartOptions
  | SetChartAggregations;
