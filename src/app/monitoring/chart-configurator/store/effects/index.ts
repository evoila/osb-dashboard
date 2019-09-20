import { OptionsEffects } from './options.effect';
import { RouterEffect } from 'app/monitoring/chart-configurator/store/effects/router.effect';
import { OptionsToolboxEffect } from './options.toolbox.effect';
import { AggregationEffect } from './aggregation.effect';
import { ChartIncreationEffect } from './chart.increation.effect';


export const effects: Array<any> = [
  OptionsEffects,
  RouterEffect,
  OptionsToolboxEffect,
  AggregationEffect,
  ChartIncreationEffect,
];
