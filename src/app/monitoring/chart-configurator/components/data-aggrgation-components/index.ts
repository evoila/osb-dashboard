import { CreateAggregationComponent } from './create-aggregation/create-aggregation.component';
import { ScopeAggregationsComponent } from './scope-aggregations/scope-aggregations.component';
import { ChartPreviewComponent } from './chart-preview/chart-preview.component';
import { ErrorConsoleComponent } from './error-console/error-console.component';

import {
  AggregationListComponent,
  BottomSheetAggregationSheet
} from './aggregation-list/aggregation-list.component';
import { ScopingComponent } from './scoping/scoping.component';

export const aggregationComponents = [
  AggregationListComponent,
  BottomSheetAggregationSheet,
  CreateAggregationComponent,
  ScopeAggregationsComponent,
  ChartPreviewComponent,
  ScopingComponent,
  ErrorConsoleComponent
];
