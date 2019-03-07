import { CfAuthScope } from '../../chart-configurator/model/cfAuthScope';
import { ChartInPanel } from '../../model/chart-in-panel';

export interface PanelVm {
  readonly id?: string;
  authScope: CfAuthScope;
  charts: Array<Array<ChartInPanel>>;
  name: string;
  description: string;
}
