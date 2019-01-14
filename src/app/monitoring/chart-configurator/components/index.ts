import { optionsEditorDeclarations } from './options-editor-components';
import { BaseChartComponent } from './base-chart/base-chart.component';
import { aggregationComponents } from './data-aggrgation-components';

export const componentsDeclarations = [
  ...optionsEditorDeclarations,
  ...aggregationComponents,
  BaseChartComponent
];
