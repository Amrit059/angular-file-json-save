import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpDomain: string = environment.httpBaseHref;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  get(url: string, options: any): Observable<any> {
    return this.httpClient.get(this.httpDomain + url, options);
  }

  post(url: string, body: any, options: any): Observable<any> {

    return this.httpClient.post(this.httpDomain + url, body, options);
  }

  put(url: string, body: any, options: any): Observable<any> {

    return this.httpClient.put(this.httpDomain + url, body, options);
  }

  delete(url: string, options: any): Observable<any> {

    return this.httpClient.delete(this.httpDomain + url, options);
  }
}
