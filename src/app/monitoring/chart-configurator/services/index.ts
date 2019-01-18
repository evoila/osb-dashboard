import { ExampleChartsService } from './example-charts.service';
import { OptionsService } from './options.service';
import { AggregationService } from './aggregation.service';
import { CfAuthParameterService } from '../../shared/services/cfauth-param.service';

export const services = [
  ExampleChartsService,
  OptionsService,
  AggregationService,
  CfAuthParameterService
];
export * from './';
