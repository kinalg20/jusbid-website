import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {

  public _baseurl = environment.api_baseurl;

  constructor(public http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get<any>(this._baseurl + url).pipe(catchError(this.ErrorHandler.bind(this)));
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post<any>(this._baseurl + url, data).pipe(catchError(this.ErrorHandler.bind(this)));
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put<any>(this._baseurl + url, data).pipe(catchError(this.ErrorHandler.bind(this)));
  }
 
  delete(url: string, data: any): Observable<any> {
    return this.http.delete<any>(this._baseurl + url, data).pipe(catchError(this.ErrorHandler.bind(this)));
  }

  private ErrorHandler(error: any) {
    return throwError(error)
  }

}



