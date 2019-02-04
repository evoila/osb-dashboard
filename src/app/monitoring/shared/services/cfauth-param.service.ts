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

@Injectable({ providedIn: ChartConfiguratorModule })
export class CfAuthParameterService {
  private orgAndSpace$: Observable<SpaceAndOrg>;
  private store: Store<BindingsState>;

  public createCfAuthParameters(): Observable<HttpParams> {
    return this.createCfAuthScope().pipe(
      map((authScope: CfAuthScope) =>
        this.paramService.convertParams(authScope)
      )
    );
  }

  public createCfAuthScope(): Observable<CfAuthScope> {
    const { serviceInstanceId } = environment;

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

  public construct(store: Store<BindingsState>) {
    if (!this.store) {
      this.store = store;
      this.orgAndSpace$ = store.select(getBindingsLoadingState).pipe(
        filter(state => {
          // dispatch Event if
          !state.loaded &&
            !state.loading &&
            this.store.dispatch(new LoadBindings());

          return state.loaded == true;
        }),
        switchMap(k => store.select(getBindingsSpaceAndOrg))
      );
    }
    return this;
  }

  constructor(private paramService: HttpGetParamsService) {}
}
