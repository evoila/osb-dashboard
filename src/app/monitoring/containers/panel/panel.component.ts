import { Component, OnInit, ElementRef, ViewChild, Renderer2, OnDestroy, AfterViewInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import * as moment from 'moment/moment';
import { EsTimerangeService } from 'app/monitoring/services/es-timerange.service';



import { filter, map, switchMap, take } from 'rxjs/operators';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { PanelState } from 'app/monitoring/shared/store/reducers/panel.reducer';
import { Store, select } from '@ngrx/store';
import { getPanelById, getPanelState } from '../../shared/store/selectors/panel.selector';
import { State } from 'app/monitoring/store';
import { getParams } from '../../store/reducers/index';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { Panel } from '../../shared/model/panel';
import { SetStateForUpdate, AddChartToPanel, FlushState } from '../../panel-configurator/store/actions/panel-increation.action';
import { PanelIncreationState } from 'app/monitoring/panel-configurator/store/reducers/panel-increation.reducer';
import { Chart } from '../../shared/model/chart';
import { buildFunctionalPanel } from '../../panel-configurator/store/selectors/panel-increation.selector';
import { UpdatePanel, LoadPanels } from '../../shared/store/actions/panel.action';
import { FirePanelAggregationRequest } from '../../shared/store/actions/chart.actions';
import { ChartInPanel } from '../../model/chart-in-panel';


@Component({
  selector: 'sb-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, OnDestroy {

  @ViewChild('container')
  container: ElementRef;

  @ViewChild('chartcontainer')
  chartcontainer: ElementRef;

  @ViewChild('toggleSidePanelEle')
  toggleSidePanelEle: ElementRef;

  // Side Panel that contains Charts that can be dragged and dropped into the Panel
  sidePanelHidden = true;


  public panel: Panel;
  public menu: { [k: string]: any } = {};
  public toDateView: any = moment().unix();
  public fromDateView: any = moment().subtract(1, "days").unix();
  public steps: [string, string];
  public changed = false;
  private timeRangeEmitter$: Subject<any> = new Subject();
  public timeRange$: Observable<{ [key: string]: any }> = new Observable(k => this.timeRangeEmitter$.subscribe(k));
  public edit: boolean;
  /*--------------Subjects & Observables -------------*/
  public editModeSubject = new Subject<boolean>();
  public editMode$ = new Observable(k => this.editModeSubject.subscribe(k));

  public editControlSubject = new Subject<string>();
  public editControl$ = new Observable(k => this.editControlSubject.subscribe(k));

  // handles all subscriptions to unsubscribe on destroy
  private subscriptions: Subscription[] = [];
  // just an Object that is to save a subscription till its pushed to the array
  private subscription: Subscription;
  // redo object holds old references of the panel object

  // every chart emits an size update 
  // we need this counter to be certain when a chart
  // can be persisted see --> persistPanel
  private saveCounter = 0;

  private redoObject = {} as Panel;
  constructor(
    private timeRangeService: EsTimerangeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<PanelState>,
    private panelStore: Store<PanelIncreationState>,
    private routerStore: Store<State>,
    private renderer: Renderer2
  ) {
    this.menu['view'] = 'Views:';
    this.menu['viewSettings'] = ['1', '2', '3'];
  }
  ngOnInit() {
    this.registerRouterEvents();
    this.subscription = this.timeRange$.subscribe(k => {
      if (this.panel && this.panel.charts.length) {
        this.store.dispatch(new FirePanelAggregationRequest(this.panel, k));
      }
    });
    this.subscriptions.push(this.subscription);

    /*     //Autorefresh every 10 Seconds
        this.subscription = timer(10000, 10000).subscribe(i => {
          const now = moment().unix();
          const diff = this.toDateView - now;
          this.fromDateView = moment.unix(this.fromDateView + diff).unix();
          this.toDateView = now;
          this.setDateRange();
        })
        this.subscriptions.push(this.subscription); */

    this.setDateRange();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(k => k.unsubscribe());
  }

  public toggleSidePanel() {
    this.sidePanelHidden = !this.sidePanelHidden;
    this.rerenderSidePanel();
  }

  rerenderSidePanel() {
    if (this.sidePanelHidden) {
      this.renderer.setStyle(this.container.nativeElement, 'grid-template-columns', '7fr 1fr');
    } else {
      this.renderer.setStyle(this.container.nativeElement, 'grid-template-columns', '1fr 0px');
    }
  }
  // Side Panel to add charts has a Toggle to hide and seek which should be deactivated on edit mode
  hideToggleSidePanel(hide: boolean) {
    if (hide) {
      this.renderer.setStyle(this.toggleSidePanelEle.nativeElement, 'display', 'none');
    } else {
      this.renderer.setStyle(this.toggleSidePanelEle.nativeElement, 'display', 'inline-block');
    }

  }
  editPanel() {
    this.store.dispatch(new SetStateForUpdate(this.panel));
    this.router.navigate(['/monitoring/panelconfigurator']);
  }

  trackByFn(index, item) {
    return item.id;
  }

  drop(event: CdkDragDrop<Chart>) {
    this.store.pipe(select(getPanelById, this.panel.id)).pipe(take(1)).subscribe(k => {
      this.panelStore.dispatch(new SetStateForUpdate(k));
      this.panelStore.dispatch(new AddChartToPanel(event.item.data));
      this.panelStore.pipe(select(buildFunctionalPanel)).pipe(take(1)).subscribe(k => {
        this.store.dispatch(new UpdatePanel(k));
        this.panelStore.dispatch(new FlushState());
        this.store.pipe(select(getPanelState),
          filter(k => k.panelSaved),
          take(1),
          switchMap(k => {
            this.store.dispatch(new LoadPanels());
            return this.store.pipe(select(getPanelState),
              filter(k => k.panelsLoaded),
              take(1),
              switchMap(k => {
                return this.store.pipe(select(getPanelById, this.panel.id));
              })
            )
          })
        ).subscribe((k: Panel) => this.panel = k);
      });
    });
  }
  registerRouterEvents() {
    this.subscription = this.routerStore
      .select(getParams)
      .pipe(
        switchMap((params: Params) =>
          this.store
            .pipe(select(getPanelById, params['id']))
        ),
        filter(
          (k: any) =>
            k != undefined && k.charts
        )
      )
      .subscribe((k: Panel) => {
        this.panel = { ...k };
        this.setDateRange();
      });
    this.subscriptions.push(this.subscription);
  }

  setFromDate(date: any) {
    this.fromDateView = date;
    this.setDateRange();
  }
  setToDate(date: any) {
    this.toDateView = date;
    this.setDateRange();
  }
  deleteChart(chart: ChartInPanel) {
    const charts = this.panel.charts.filter(chartIter => chartIter.id != chart.id);
    this.panel = { ...this.panel, charts };
  }
  switchCharts(event: CdkDragDrop<ChartInPanel>) {
    const chart = this.panel.charts[event.previousIndex];
    const oldChart = this.panel.charts[event.currentIndex];
    const charts = [...this.panel.charts];
    charts[event.currentIndex] = chart;
    charts[event.previousIndex] = oldChart;
    this.panel = { ...this.panel, charts };
  }

  toggleEditmode() {
    this.redoObject = { ...this.panel };
    this.edit = true;
    this.editModeSubject.next(true);
    this.sidePanelHidden = true;
    this.rerenderSidePanel();
    this.hideToggleSidePanel(true);

  }
  cancelEdit() {
    this.panel = this.redoObject;
    this.edit = false;
    this.redoObject = {} as Panel;
    this.editModeSubject.next(false);
    this.editControlSubject.next('cancel');
    this.hideToggleSidePanel(false);
  }
  saveEdit() {
    this.edit = false;
    this.editModeSubject.next(false);
    this.editControlSubject.next('save');
    this.hideToggleSidePanel(false);
  }
  saveSize(size: number, chart: ChartInPanel) {
    const charts = this.panel.charts.map(k => chart.id == k.id ? { ...chart, size: size } : k);
    this.panel = { ...this.panel, charts };
    this.persistPanel();
  }
  persistPanel() {
    // wait until every chart has been updated
    this.saveCounter++;
    if (this.saveCounter === this.panel.charts.length &&
      JSON.stringify(this.panel) !== JSON.stringify(this.redoObject)) {
      this.panelStore.dispatch(new UpdatePanel(this.panel));
      this.redoObject = {} as Panel;
      this.saveCounter = 0;
    }
  }

  private setDateRange() {
    if (this.toDateView && this.fromDateView) {
      this.timeRangeEmitter$.next(this.timeRangeService.setTimeRange(
        this.fromDateView,
        this.toDateView
      ));
    }
  }

}
