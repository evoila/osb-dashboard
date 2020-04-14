import { Chart } from '../shared/model/chart';
import { PanelElement } from '../shared/model/panel-element';

export class ChartInPanel extends PanelElement {
  readonly id?: string;
  chart: Chart;
  


  constructor(chart: Chart, order: number, size: number) { 
    super(order, size, 'chart');
    this.chart = chart;
    
  }


}
