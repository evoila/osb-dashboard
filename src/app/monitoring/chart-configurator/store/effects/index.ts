import { OptionsEffects } from './options.effect';
import { BindingsEffect } from './bindings.effect';
import { RouterEffect } from 'app/monitoring/chart-configurator/store/effects/router.effect';
import { OptionsToolboxEffect } from './options.toolbox.effect';
import { AggregationEffect } from './aggregation.effect';
import { ChartIncreationEffect } from './chart.increation.effect';

export const effects: Array<any> = [
  OptionsEffects,
  BindingsEffect,
  RouterEffect,
  OptionsToolboxEffect,
  AggregationEffect,
  ChartIncreationEffect
];
