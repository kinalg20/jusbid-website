import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private __auth: AuthenticationService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    var userToken = localStorage.getItem("jusbidUserToken");
    if (userToken) {
      if (JSON.parse(userToken) == null) {
        return next.handle(request);
      }
    }
    const authorized_request = request.clone(
      // {
      //   params: new HttpParams().set('jat', JSON.parse(localStorage.getItem("jusbidUserToken")))
      // }

      {headers: request.headers.set('Content-Type', 'application/json')}
      // {
      //   headers: new HttpHeaders({
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*',
      //   })
      // }

    );
    return next.handle(authorized_request);
  }

}