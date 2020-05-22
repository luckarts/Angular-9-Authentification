import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpConnectorsService {
  constructor(private http: HttpClient) {}

  public getRequest(url): Observable<any> {
    return this.http.get(url);
  }

  public postRequest(url, params): Observable<any> {
    return this.http.post(url, params);
  }
  public putRequest(url, params): Observable<any> {
    return this.http.put(url, params);
  }
}
