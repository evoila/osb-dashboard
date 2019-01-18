import { CfAuthScope } from '../../chart-configurator/model/cfAuthScope';

export interface PanelVm {
  readonly id?: string;
  authScope: CfAuthScope;
  charts: Array<Array<Chart>>;
  name: string;
  description: string;
}
