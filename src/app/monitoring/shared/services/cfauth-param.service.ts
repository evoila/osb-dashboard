import { BindingsState } from '../store/reducers/binding.reducer';
import { Store } from '@ngrx/store';
import { filter, switchMap, map } from 'rxjs/operators';
import {
  getAllBindingsLoaded,
  getBindingsSpaceAndOrg
} from '../store/selectors/bindings.selector';
import { SpaceAndOrg } from 'app/monitoring/model/service-binding';
import { Injectable } from '@angular/core';
import { LoadBindings } from '../../chart-configurator/store';
import { CfAuthScope } from '../../chart-configurator/model/cfAuthScope';
import { environment } from '../../../../environments/runtime-environment';
import { HttpGetParamsService } from '../../../core/services/http-get-params.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { ChartConfiguratorModule } from '../../chart-configurator/chart-configurator.module';
import { getBindingsLoadingState } from '../store/selectors/bindings.selector';
import { timer } from 'rxjs';
import { AuthScope } from 'app/monitoring/chart-configurator/model/authScope';
import { KcAuthScope } from 'app/monitoring/chart-configurator/model/kcAuthScope';

@Injectable({ providedIn: ChartConfiguratorModule })
export class CfAuthParameterService {
  private orgAndSpace$: Observable<SpaceAndOrg>;
  private store: Store<BindingsState>;


  public createAuthParameters(): Observable<HttpParams> {
    
    return this.createAuthScope().pipe(
      map((authScope: AuthScope) =>
        this.paramService.convertParams(authScope)
      )
    );
  }

  public createAuthScope(): Observable<AuthScope> {
    const { serviceInstanceId } = environment;

    // ATTENTION: HARDCODED TYPE HERE --> WHERE TO GET IT FROM ?
    const type = 'cf';
    if (type == 'cf'){
      return this.orgAndSpace$.pipe(
        map(orgAndSpace => {
          return {
            type: 'cf',
            orgId: orgAndSpace.org,
            spaceId: orgAndSpace.space,
            serviceInstanceId
          } as CfAuthScope;
        })
      );
    }

    else{
      return this.orgAndSpace$.pipe(
        map(orgAndSpace => {
          return {
            type: 'kc',
            customerId: orgAndSpace.org,
            partnerId: orgAndSpace.space,
            serviceInstanceId
          } as KcAuthScope;
        })
      );
    }
    
    
  }

  public construct(store: Store<BindingsState>) {
    if (!this.store) {
      this.store = store;
      this.orgAndSpace$ = store.select(getBindingsLoadingState).pipe(
        filter(state => {
          // dispatch Event if
          !state.loaded &&
            !state.loading &&
            timer(8000).subscribe(k => this.store.dispatch(new LoadBindings()));

          return state.loaded == true;
        }),
        switchMap(k => store.select(getBindingsSpaceAndOrg))
      );
    }
    return this;
  }

  constructor(private paramService: HttpGetParamsService) { }
}
