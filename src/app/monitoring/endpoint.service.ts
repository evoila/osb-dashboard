import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class EndpointService {
  private baseUrl = 'http://localhost';
  private port = ':8080';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token',
    })
  }
  public getUri(): string {
    return this.baseUrl + this.port
  }

}
