import { OptionsEffects } from './options.effect';
import { BindingsEffect } from './bindings.effect';
import { RouterEffect } from 'app/monitoring/chart-configurator/store/effects/router.effect';

export const effects: Array<any> = [
  OptionsEffects,
  BindingsEffect,
  RouterEffect
];

export * from './options.effect';
