import { CfAuthScope } from '../../chart-configurator/model/cfAuthScope';
import { PanelElement } from './panel-element';
export interface Panel {
  readonly id?: string;
  authScope: CfAuthScope;
  elements: Array<PanelElement>;
  name: string;
  description: string;
}
