import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartModelState } from '../../../shared/store/reducers/chart.reducer';
import { LoadCharts, DeleteChart } from '../../../shared/store/actions/chart.actions';
import { Observable, Subscription } from 'rxjs';
import { getCharts, getChartDeletingState } from '../../../shared/store/selectors/chart.selector';
import { Chart } from '../../../shared/model/chart';
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';


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
  
  //popup pane to confirm actions like chart deletion etc
  private modal: NgbModalRef | null = null;
  // reference for the modal to fullfill deletion and show attributes 
  private chartToDelete; // value is read in html

  constructor(private chartStore: Store<ChartModelState>, private modalService: NgbModal) { }

  ngOnInit() {
    this.chartStore.dispatch(new LoadCharts());
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
    // .pipe(filter(k => k.chartDeleting))   

    this.chartStore.dispatch(new DeleteChart(chart.id!!));
    this.chartStore.select(getChartDeletingState).subscribe(k => {  
      console.log(k);
      


    /*  UNSUBSCRIBE  HERE!!!! */
    /*
      if (!k.chartDeleted && !k.chartDeleting && k.chartNotDeletable){
        console.log('deletion not possible!');
      }
      else if (k.chartDeleted){
        console.log('deletion successfull');
      }
      else{
          console.log('unknown error');

      }
      */
      //this.modal!!.close();
    })







    

    
  }

  confirmChartDeletion(chart: Chart) {
    this.chartToDelete = chart;
    this.modal = this.modalService.open(this.deleteChartConfirmModal, { size: 'lg' });
  }
}

