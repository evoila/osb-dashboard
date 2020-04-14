import { CfAuthScope } from '../../chart-configurator/model/cfAuthScope';
import { ChartInPanel } from '../../model/chart-in-panel';
import { PanelElement } from './panel-element';

export interface PanelVm {
  readonly id?: string;
  authScope: CfAuthScope;
  elements: Array<Array<PanelElement>>;
  name: string;
  description: string;
}
