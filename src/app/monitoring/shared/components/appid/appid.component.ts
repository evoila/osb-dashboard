import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BindingService } from '../../services/binding.service';
import { ServiceBinding } from '../../../model/service-binding';
import { NotificationType } from 'app/core';
import { Observable } from 'rxjs/internal/Observable';
import { BindingsState } from '../../store/reducers/binding.reducer';
import { Store } from '@ngrx/store';
import { getAllBindingsEntities } from '../../store/selectors/bindings.selector';
import {
  NotificationService,
  Notification
} from '../../../../core/notification.service';

/*
 * Fallback Textfield offers the possibility to Type-In AppID
 * if the binding service is not available
 */
@Component({
  selector: 'sb-appid',
  templateUrl: './appid.component.html',
  styleUrls: ['./appid.component.scss']
})
export class AppidComponent implements OnInit {
  @Output('app')
  app = new EventEmitter<ServiceBinding>();

  @Input('selected')
  appId: string;

  serviceBindings: Array<ServiceBinding> | null;
  serviceBindings$: Observable<Array<ServiceBinding> | null>;
  fallBackAppName: string;
  fallBackSpace: string;
  choosen: number;
  constructor(
    public bindingService: BindingService,
    private notification: NotificationService,
    private store: Store<BindingsState>
  ) { }
  ngOnInit() {
    this.serviceBindings$ = this.store.select(getAllBindingsEntities);
    this.serviceBindings$.subscribe((data: Array<ServiceBinding>) => {
      if (data.length === 0) {
        this.notification.addSelfClosing(
          new Notification(
            NotificationType.Warning,
            'No Apps binded. Use the CF-CLI to do so'
          )
        );
      }
      this.serviceBindings = [...data];
      this.choosen = data!!
        .map((binding, index) => {
          return { binding, index };
        })
        .filter(binding => binding.binding.appId == this.appId)
        .map(k => k.index)[0];
    });
  }
  public setChoosen() {
    if (this.choosen) {
      this.app.next(this.serviceBindings!![this.choosen]);
    }
  }
  public fallBackTextFieldUpdate() {
    if (this.fallBackAppName && this.fallBackSpace) {
      const fallBackBinding = {
        appName: this.fallBackAppName,
        space: this.fallBackSpace
      } as ServiceBinding;
      this.app.next(fallBackBinding);
    }
  }
}
