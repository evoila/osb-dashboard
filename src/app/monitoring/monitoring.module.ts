import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitoringComponent } from 'app/monitoring/monitoring.component';
import { MonitoringRoutingModule } from './monitoring-routing.module';
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
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SidebarLayoutComponent } from './sidebar/sidebar-layout/sidebar-layout.component';
import { SidebarNavComponent } from './sidebar/sidebar-nav/sidebar-nav.component';
import { ToolbarButtonComponent } from './sidebar/toolbar-button/toolbar-button.component';
import { ToolbarComponent } from 'app/monitoring/sidebar';
import { ToolbarLinkComponent } from './sidebar/toolbar-link/toolbar-link.component';
import { WindowService } from './window.service';
import { AppidComponent } from './appid/appid.component';
import { LogPanelComponent } from './log-panel/log-panel.component';





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
        DlDateTimePickerDateModule,
        AngularFontAwesomeModule
    ],
    declarations: [MonitoringComponent,
        DashboardComponent, AppidComponent, LogPanelComponent,
        DateFormatPipe, ChartComponent, ChartDirective, PanelComponent, PanelEditorComponent, QueryEditorComponent, EsQueryEditorComponent,
         PromQueryEditorComponent, SidebarLayoutComponent, SidebarNavComponent, ToolbarButtonComponent, ToolbarComponent, ToolbarLinkComponent],
    providers: [
        EschartsService,
        ChartingService,
        PanelService,
        EndpointService,
        CatalogueService,
        PromChartingService,
        PromchartsService,
        EsTimerangeService,
        WindowService
    ],
})
export class MonitoringModule { }
