import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreHttpService } from './core-http.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class EntityService {

  constructor(protected readonly httpService: CoreHttpService) { }

  protected setCustomHeader(key: string, value: string) {
    this.httpService.setCustomHeader(key, value);
  }

  protected pagingAndSortingHandler(pagingAndSorting: any): string {
    var resultString: string = '';

    if (pagingAndSorting == null || pagingAndSorting.length == 0) {
      return resultString;
    }

    resultString += '?size=' + pagingAndSorting.pageSize;
    resultString += '&page=' + (pagingAndSorting.page - 1);

    return resultString;
  }

  protected filterHandler(filterQuery: any): string {
    var resultString: string = '';

    if (filterQuery == null)
      return resultString;

    Object.keys(filterQuery).forEach(key => {
      resultString += '&' + key + '=' + filterQuery[key];
    });

    return resultString;
  }

  protected get(url: string): Observable<{} | any> {
    return this.httpService
      .get(url).pipe(
      map(res => {
        return res.json() as any;
      })
      , catchError(e => this.httpService.formatError(e)));
  }

  protected delete(url: string): Observable<{} | any> {
    return this.httpService
      .delete(url).pipe(
      map(res => {
        return res.json() as any;
      })
      , catchError(e => this.httpService.formatError(e)));
  }

  protected all(url: string): Observable<{} | any> {
    return this.httpService
      .get(url).pipe(
      map(res => {
        return res.json() as any;
      }),
      catchError(e => this.httpService.formatError(e)));
  }

  protected post(url: string, entity: any): Observable<{} | any> {
    return this.httpService
      .post(url, entity).pipe(
      map(res => {
        return res.json() as any;
      })
      , catchError(e => this.httpService.formatError(e)));
  }

  protected patch(url: string, entity: any): Observable<{} | any> {
    return this.httpService
      .patch(url, entity).pipe(
      map(res => {
        return res.json() as any;
      })
      , catchError(e => this.httpService.formatError(e)));
  }

}
