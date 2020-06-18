import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartModelState } from '../../../shared/store/reducers/chart.reducer';
import { LoadCharts, DeleteChart } from '../../../shared/store/actions/chart.actions';
import { Observable } from 'rxjs';
import { getCharts, getChartModelState } from '../../../shared/store/selectors/chart.selector';
import { Chart } from '../../../shared/model/chart';
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TableModelState } from 'app/monitoring/shared/store/reducers/table.reducer';
import { LoadTables, DeleteTable } from 'app/monitoring/shared/store/actions/table.actions';
import { Table } from 'app/monitoring/shared/model/table';
import { getTables, getTableModelState } from 'app/monitoring/shared/store/selectors/table.selector';
import { PanelElement } from 'app/monitoring/shared/model/panel-element';
import { filter, take } from 'rxjs/operators';
import { SharedModuleState } from 'app/monitoring/shared/store/reducers';


@Component({
  selector: 'sb-add-chart-sidepanel',
  templateUrl: './add-chart-sidepanel.component.html',
  styleUrls: ['./add-chart-sidepanel.component.scss']
})
export class AddChartSidepanelComponent implements OnInit {
  @Output('ended')
  ended = new EventEmitter<CdkDragEnd>();

  @Output('started')
  started = new EventEmitter<CdkDragStart>();

  @ViewChild('confirmModal')
  deleteChartConfirmModal: ElementRef;

  
  charts$: Observable<Array<Chart>>;
  tables$: Observable<Array<Table>>;

  charts_loaded = false;
  tables_loaded = false;
  
  // popup pane to confirm actions like chart deletion etc
  private modal: NgbModalRef | null = null;
  // popup pane to inform user about unability to delete chart
  private modal2: NgbModalRef | null = null;

  // reference for the modal to fullfill deletion and show attributes 
  private chartToDelete: Chart | null = null; // value is read in html
  // reference for the modal to fullfill deletion and show attributes 
  private tableToDelete: Table | null = null; // value is read in html

  constructor(private sahredStore: Store<SharedModuleState>, private chartStore: Store<ChartModelState>, private tableStore: Store<TableModelState>, private modalService: NgbModal) { }

  ngOnInit() {
    
    /* 
    PROBLEM:  LOADING CHARTS HERE leads to undefined (unexisting) TABLEMODELSTATE 
    even though tablemodel state has been normal and defined before
    */
    //this.chartStore.dispatch(new LoadCharts());
    this.tableStore.dispatch(new LoadTables());
    this.loadSidebar();
    
  }

  loadSidebar(){
    this.tables$ = this.tableStore.select(getTables);
    this.charts$ = this.chartStore.select(getCharts);
  
    
  }


  end(event: CdkDragEnd) {
    console.log('fire');
    // push end event in parent component
    this.ended.next(event);
  }
  start(event: CdkDragStart) {
    console.log('fire');
    this.started.next(event);
  }

  deleteChart(chart: Chart) {
   
    this.chartStore.dispatch(new DeleteChart(chart.id!!));
    this.modal!!.close();
    
  }

  deleteTable(table: Table) {
    this.tableStore.dispatch(new DeleteTable(table));
    this.modal!!.close();
    this.loadSidebar();
  }



  confirmChartDeletion(chart: Chart) {
    this.chartToDelete = chart;
    this.tableToDelete = null;
    this.modal = this.modalService.open(this.deleteChartConfirmModal, { size: 'lg' });
  }

  confirmTableDeletion(table: Table) {
    this.tableToDelete = table;
    this.chartToDelete = null;
    console.log('delete table here !!');
    this.modal = this.modalService.open(this.deleteChartConfirmModal, { size: 'lg' });
  }
}

