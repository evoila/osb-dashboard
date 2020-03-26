import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointService } from './endpoint.service';
import { CfAuthParameterService } from './cfauth-param.service';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { BindingsState } from '../store/reducers/binding.reducer';
import { Table } from '../model/table';

@Injectable()
export class TableService {
  private readonly url: string;
  private cfAuthParams: CfAuthParameterService;
  constructor(
    private http: HttpClient,
    endpoint: EndpointService,
    storeBindings: Store<BindingsState>,
    cfAuthParams: CfAuthParameterService
  ) {
    this.cfAuthParams = cfAuthParams.construct(storeBindings);

  /************************************** 
   * 
   *  TODO: insert right endpoints for table service
   * 
   * 
   * 
   * 
  */
  
    this.url = `${endpoint.getUri()}/......................................`;
  }

  public getAllTables(): Observable<Array<Table>> {
    return this.cfAuthParams.createCfAuthParameters().pipe(
      flatMap(params => {
        return this.http.get<Array<Table>>(this.url, { params });
      })
    );
  }
  public createTable(table: Table): Observable<Table> {
    return this.http.put<Table>(this.url, table);
  }

  public deleteTable(tableId: string): Observable<Table> {
    const customUri = `${this.url}/${tableId}`;
    return this.cfAuthParams.createCfAuthParameters().pipe(
      flatMap(params => {
        return this.http.delete<Table>(customUri, {params});
      })
    );
  }
}
