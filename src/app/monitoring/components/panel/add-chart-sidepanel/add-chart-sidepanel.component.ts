import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartModelState } from '../../../shared/store/reducers/chart.reducer';
import { LoadCharts, DeleteChart } from '../../../shared/store/actions/chart.actions';
import { Observable, Subscription, Subject } from 'rxjs';
import { getCharts, getChartDeletingState } from '../../../shared/store/selectors/chart.selector';
import { Chart } from '../../../shared/model/chart';
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { filter, take, takeUntil } from 'rxjs/operators';


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

  @ViewChild('chartNotDeletableModal')
  chartNotDeletableModal: ElementRef;



  charts$: Observable<Array<Chart>>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  // popup pane to confirm actions like chart deletion etc
  private modal: NgbModalRef | null = null;
  // popup pane to inform user about unability to delete chart
  private modal2: NgbModalRef | null = null;

  // reference for the modal to fullfill deletion and show attributes 
  private chartToDelete; // value is read in html

  constructor(private chartStore: Store<ChartModelState>, private modalService: NgbModal) { }

  ngOnInit() {
    this.chartStore.dispatch(new LoadCharts());
    this.charts$ = this.chartStore.select(getCharts);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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

    this.chartStore.select(getChartDeletingState).pipe(filter(k => k.chartDeleting), take(1)).subscribe((ka) => {
      this.chartStore.select(getChartDeletingState).pipe(filter(k => !k.chartDeleting), take(1)).subscribe(deleteSate => {
        if(!deleteSate.chartDeleted && deleteSate.chartNotDeletable) {
          // chart not deletable, beacuse it's used in panel
          this.modal!!.close();
          this.modal2 = this.modalService.open(this.chartNotDeletableModal, { size: 'lg' });
        }
        else if(deleteSate.chartDeleted && !deleteSate.chartNotDeletable){
          // chart deleted successfully
          this.modal!!.close();
        }
      });
      
    });

    //
  }



  confirmChartDeletion(chart: Chart) {
    this.chartToDelete = chart;
    this.modal = this.modalService.open(this.deleteChartConfirmModal, { size: 'lg' });
  }
}

