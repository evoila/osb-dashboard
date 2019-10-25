import { panelComponents } from './panel';
import { logComponents } from './log-messages';
import { TimefilterComponent } from './timefilter/timefilter.component';
import { uielementsComponents } from './uielements/index';

export const components = [
  ...panelComponents,
  ...logComponents,
  ...uielementsComponents,
  TimefilterComponent
];
