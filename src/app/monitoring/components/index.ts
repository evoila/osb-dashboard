import { panelComponents } from './panel';
import { logComponents } from './log-messages';
import { TimefilterComponent } from './timefilter/timefilter.component';

export const components = [
  ...panelComponents,
  ...logComponents,
  TimefilterComponent
];
