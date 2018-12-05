import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpGetParamsService {
  constructor() {}

  public convertParams(objetToTransform: any): HttpParams {
    let params = new HttpParams();
    Object.keys(objetToTransform).forEach((key: string) => {
      params = params.append(key, objetToTransform[key]);
    });
    return params;
  }
}
