import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitoringComponent } from 'app/monitoring/monitoring.component';
import { MonitoringRoutingModule } from './monitoring-routing.module';
import { NouisliderModule } from 'ng2-nouislider';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { FormsModule } from '@angular/forms';
import {
  NgbDropdownModule,
  NgbCollapseModule,
  NgbTooltipModule,
  NgbModalModule,
  NgbPopoverModule,
  NgbTabsetModule,
  NgbPaginationModule,
  NgbButtonsModule,
  NgbAccordionModule,
  NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { ChartComponent } from './chart/chart/chart.component';
import { EschartsService } from 'app/monitoring/escharts.service';
import { ChartingService } from './charting.service';
import { ChartDirective } from 'app/monitoring/chart.directive';

import { PanelComponent } from './panel/panel.component';
import { PanelService } from './panel.service';
import { PanelEditorComponent } from './panel-editor/panel-editor.component';
import { QueryEditorComponent } from './query-editor/query-editor.component';
import { CatalogueService } from './catalogue.service';
import { EsQueryEditorComponent } from './es-query-editor/es-query-editor.component';
import { PromChartingService } from './prom-charting.service';
import { PromchartsService } from './promcharts.service';
import { PromQueryEditorComponent } from './prom-query-editor/prom-query-editor.component';
import { EsTimerangeService } from 'app/monitoring/es-timerange.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { reducers, CustomSerializer } from './store';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// NO PRODUCTION VALUES
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { WindowService } from './window.service';
import { LogPanelComponent } from './log-panel/log-panel.component';
import { LogListComponent } from './log-list/log-list.component';
import { LogSearchComponent } from './log-search/log-search.component';
import { LogFilterComponent } from './log-filter/log-filter.component';
import { TimefilterComponent } from './timefilter/timefilter.component';

import { CoreModule } from 'app/core/core.module';
import { environment } from '../../environments/runtime-environment';
import { StoreDevtools } from '@ngrx/store-devtools/src/devtools';
import { SharedModule } from './shared/shared.module';
import { ChartConfiguratorModule } from './chart-configurator/chart-configurator.module';

// Store Freeze restricts every mutation on the Store itself. But we want this to be a dev only thing

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

const monacoEditorConfig: NgxMonacoEditorConfig = {
  baseUrl: '/app/assets'
};

@NgModule({
  imports: [
    CommonModule,
    MonitoringRoutingModule,
    NouisliderModule,
    FormsModule,
    NgbTabsetModule,
    NgbDropdownModule.forRoot(),
    NgbCollapseModule.forRoot(),
    NgbTooltipModule.forRoot(),
    NgbModalModule.forRoot(),
    NgbPopoverModule.forRoot(),
    NgbTabsetModule.forRoot(),
    NgbPaginationModule.forRoot(),
    NgbButtonsModule.forRoot(),
    NgbAccordionModule.forRoot(),
    NgbAlertModule.forRoot(),
    DlDateTimePickerDateModule,
    AngularFontAwesomeModule,
    MonacoEditorModule.forRoot(monacoEditorConfig),
    CoreModule,
    DragDropModule,
    SharedModule,
    ChartConfiguratorModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule
  ],
  declarations: [
    MonitoringComponent,
    LogPanelComponent,
    DateFormatPipe,
    ChartComponent,
    ChartDirective,
    PanelComponent,
    PanelEditorComponent,
    QueryEditorComponent,
    EsQueryEditorComponent,
    PromQueryEditorComponent,
    LogListComponent,
    LogSearchComponent,
    LogFilterComponent,
    TimefilterComponent
  ],
  providers: [
    EschartsService,
    ChartingService,
    PanelService,
    CatalogueService,
    PromChartingService,
    PromchartsService,
    EsTimerangeService,
    WindowService,
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ]
})
export class MonitoringModule {}
