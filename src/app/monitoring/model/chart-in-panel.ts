import { Chart } from '../shared/model/chart';

export interface ChartInPanel {
  readonly id?: string;
  chart: Chart;
  order: number;
  size: number;
}
