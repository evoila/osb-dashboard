import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitoringComponent } from 'app/monitoring/monitoring.component';
import { MonitoringRoutingModule } from './monitoring-routing.module';
import { LogsComponent } from './logs/logs.component'
import { NouisliderModule } from 'ng2-nouislider';
import { HttpClientModule } from '@angular/common/http';


import { FormsModule } from '@angular/forms';
import { NgbDropdownModule,
    NgbCollapseModule,
    NgbTooltipModule,
    NgbModalModule,
    NgbPopoverModule,
    NgbTabsetModule,
    NgbPaginationModule,
    NgbButtonsModule,
  } from '@ng-bootstrap/ng-bootstrap';
import { MetricsComponent } from './metrics/metrics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { ChartComponent } from './chart/chart/chart.component';
import { EschartsService } from 'app/monitoring/escharts.service';


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
        HttpClientModule,
    ],
    declarations: [MonitoringComponent, LogsComponent,
        MetricsComponent, DashboardComponent,
        DateFormatPipe, ChartComponent],
    providers: [
        EschartsService
      ],
})
export class MonitoringModule { }
