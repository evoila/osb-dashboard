import { CfAuthScope } from '../../chart-configurator/model/cfAuthScope';

import { ChartInPanel } from '../../model/chart-in-panel';
export interface Panel {
  readonly id?: string;
  authScope: CfAuthScope;
  charts: Array<ChartInPanel>;
  name: string;
  description: string;
}
