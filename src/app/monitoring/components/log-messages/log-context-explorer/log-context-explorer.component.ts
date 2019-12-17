import { Component, OnInit, Input, EventEmitter, OnDestroy, ChangeDetectorRef, AfterViewInit, HostListener, } from '@angular/core';
import { Hits } from '../../../model/search-response';
import { Observable, Subscription, Subject, throwError as observableThrowError } from 'rxjs';
import { ServiceBinding } from 'app/monitoring/model/service-binding';

import { SearchService } from 'app/monitoring/shared/services/search.service';
import { tap, filter, take, map } from 'rxjs/operators';
import { LogDataModel } from 'app/monitoring/model/log-data-model';
import { Store } from '@ngrx/store';
import { BindingsState, } from '../../../shared/store/reducers/binding.reducer';
import { ElasticContextQuery } from '../../../shared/model/elastic-context-query';
import { NotificationService, Notification, NotificationType } from '../../../../core/notification.service';
import { authScopeFromBinding } from '../../../chart-configurator/model/cfAuthScope';
import { getAllBindingsEntities } from '../../../shared/store/selectors/bindings.selector';

@Component({
  selector: 'sb-log-context-explorer',
  templateUrl: './log-context-explorer.component.html',
  styleUrls: ['./log-context-explorer.component.scss']
})
export class LogContextExplorerComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input('mainLogMsg')
  logMessage: LogDataModel

  scope: Partial<ServiceBinding> = {};

  loadingSubject = new Subject<boolean>();
  loading$ = new Observable<boolean>(k => this.loadingSubject.subscribe(k));

  hitsSubject = new Subject<Hits>();
  hits$ = new Observable<Hits>(k => this.hitsSubject.subscribe(k));

  constructor(
    private cdr: ChangeDetectorRef,
    private searchService: SearchService,
    private store: Store<BindingsState>,
    private notificationService: NotificationService
  ) { }


  ngOnDestroy() {
    
  }

  ngAfterViewInit() {
    //console.log("detatching change detection");
    // We only want to detach the change detectors after change detection has been
    // performed for the first time
    //this.cdr.detach();
}

  ngOnInit() {
    console.log("ngOnInit() LogContextExplorerComponent");
    this.fireContextSearchRequest();
  }


  fireContextSearchRequest() {
    this.buildContextSearchRequest().pipe(filter(k => !(k instanceof Error))).subscribe((req: ElasticContextQuery) => {
      this.fireRequest(req).subscribe((data: Hits) => {
        this.loadingSubject.next(false);
        this.hitsSubject.next(data);
      });
    });
  }


  private buildContextSearchRequest(): Observable<ElasticContextQuery | Error> {
    let binding: ServiceBinding;
    return this.store.select(getAllBindingsEntities).pipe(
      tap(k => console.log(k)),
      filter(k => !!k),
      map((k: Array<ServiceBinding>) => k.filter(bind => bind.appId == this.logMessage._source.appId)), take(1),
      map(k => {
        if (k) {
          binding = k[0]
          return {
            authScope: authScopeFromBinding(binding!!),
            appId: binding!!.appId,
            sourceInstance: this.logMessage._source.sourceInstance,
            size: 10,
            index: this.logMessage._index,
            timestamp: this.logMessage._source.timestamp
          } as ElasticContextQuery;
        } else {
          const errorMsg = "Binding for app is Missing";
          console.error(errorMsg);
          this.notificationService.addSelfClosing(new Notification(NotificationType.Error, errorMsg, undefined));
          observableThrowError(errorMsg);
          return new Error();
        }
      }));
  }



  private fireRequest(request: ElasticContextQuery): Observable<Hits> {
    this.loadingSubject.next(true);
    return this.searchService.getChronologicalContext(request).pipe(
      tap((data: Array<LogDataModel>) => {
        if (!data) {
          const errorMsg = "no data found, CHECK YOUR REQUEST"
          console.error(errorMsg);
          this.notificationService.addSelfClosing(new Notification(NotificationType.Error, errorMsg, undefined));
        }
      }),
      filter((data: Array<LogDataModel>) => !!data),
      map(data => { return { total: data.length, max_score: 1, hits: data } as Hits })
    );
  }



}