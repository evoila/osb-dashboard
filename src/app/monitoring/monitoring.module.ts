import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitoringComponent } from 'app/monitoring/monitoring.component';
import { MonitoringRoutingModule } from './monitoring-routing.module';
import { LogsComponent } from './logs/logs.component'
import { NouisliderModule } from 'ng2-nouislider';
import { HttpClientModule } from '@angular/common/http';
import { NgDragDropModule } from 'ng-drag-drop';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';



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
import { MetricsComponent } from './metrics/metrics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { ChartComponent } from './chart/chart/chart.component';
import { EschartsService } from 'app/monitoring/escharts.service';
import { ChartingService } from './charting.service';
import { ChartDirective } from 'app/monitoring/chart.directive';

import { PanelComponent } from './panel/panel.component';
import { PanelService } from './panel.service';
import { EndpointService } from './endpoint.service';
import { PanelEditorComponent } from './panel-editor/panel-editor.component';
import { QueryEditorComponent } from './query-editor/query-editor.component';
import { CatalogueService } from './catalogue.service';
import { EsQueryEditorComponent } from './es-query-editor/es-query-editor.component';
import { PromChartingService } from './prom-charting.service';
import { PromchartsService } from './promcharts.service';
import { PromQueryEditorComponent } from './prom-query-editor/prom-query-editor.component';
import { EsTimerangeService } from 'app/monitoring/es-timerange.service';



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
        HttpClientModule,
        NgDragDropModule.forRoot(),
        DlDateTimePickerDateModule
    ],
    declarations: [MonitoringComponent, LogsComponent,
        MetricsComponent, DashboardComponent,
        DateFormatPipe, ChartComponent, ChartDirective, PanelComponent, PanelEditorComponent, QueryEditorComponent, EsQueryEditorComponent, PromQueryEditorComponent],
    providers: [
        EschartsService,
        ChartingService,
        PanelService,
        EndpointService,
        CatalogueService,
        PromChartingService,
        PromchartsService,
        EsTimerangeService
    ],
})
export class MonitoringModule { }
