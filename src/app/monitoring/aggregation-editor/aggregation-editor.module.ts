import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitoringModule } from '../monitoring.module';
import { BoundsFieldComponent, InputFieldComponent, SelectFieldComponent, AggregationEditorComponent, ChartingUtilsService } from 'app/monitoring/aggregation-editor';
import { FiltersFieldComponent } from './filters-field/filters-field.component';
import { OrderFieldComponent } from './order-field/order-field.component';
import { ParamsFieldComponent } from './params-field/params-field.component';
import { RangesFieldComponent } from './ranges-field/ranges-field.component';
import { TextareaFieldComponent } from './textarea-field/textarea-field.component';
import { ValueSelectFieldComponent } from './value-select-field/value-select-field.component';
import { AggregationSelectorComponent } from './aggregation-selector/aggregation-selector.component';
import { FormsModule } from '@angular/forms';
import { AggregationTemplateService } from './aggregation-template.service';


const components = [BoundsFieldComponent, FiltersFieldComponent, InputFieldComponent, OrderFieldComponent, ParamsFieldComponent,
  RangesFieldComponent, SelectFieldComponent, TextareaFieldComponent, ValueSelectFieldComponent, AggregationSelectorComponent, AggregationEditorComponent];
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [...components, AggregationEditorComponent],
  providers: [AggregationTemplateService, ChartingUtilsService],
  exports: [...components]
})
export class AggregationEditorModule { }
