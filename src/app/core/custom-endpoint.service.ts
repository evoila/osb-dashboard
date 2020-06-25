import { Injectable } from '@angular/core';
import { environment } from 'environments/runtime-environment';
import { Server } from './extension-url';

@Injectable({
  providedIn: 'root'
})
export class CustomEndpointService {

  protected baseUrl = "";
  constructor() { }

  public getUri(identifier: string): string | null {
    const matchingEnvs: Array<Server> = environment
      .customEndpoints
      .filter((k: Server) => k.identifier === identifier);
    if (matchingEnvs.length > 0) {
      return matchingEnvs[0].url;
    } else {
      return this.baseUrl ? this.baseUrl : null;
    }
  }
}
