import { BindingsState } from '../store/reducers/binding.reducer';
import { Store } from '@ngrx/store';
import { filter, switchMap, map } from 'rxjs/operators';
import {
  getAllBindingsLoaded,
  getBindingsSpaceAndOrg
} from '../store/selectors/bindings.selector';
import { SpaceAndOrg } from 'app/monitoring/model/service-binding';
import { Injectable } from '@angular/core';
import { LoadBindings } from '../store';
import { CfAuthScope } from '../model/cfAuthScope';
import { environment } from '../../../../environments/runtime-environment';
import { HttpGetParamsService } from '../../../core/services/http-get-params.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { flatMap } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class CfAuthParameterService {
  private orgAndSpace$: Observable<SpaceAndOrg>;

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
  constructor(
    private store: Store<BindingsState>,
    private paramService: HttpGetParamsService
  ) {
    this.orgAndSpace$ = store.select(getAllBindingsLoaded).pipe(
      filter((loaded: boolean) => {
        // dispatch Event if
        !loaded && this.store.dispatch(new LoadBindings());
        return loaded == true;
      }),
      switchMap(k => store.select(getBindingsSpaceAndOrg))
    );
  }
}
