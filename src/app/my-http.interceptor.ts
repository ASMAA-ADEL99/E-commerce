import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(localStorage.getItem("etoken") != null){
    let myHeaders:any={token:localStorage.getItem('etoken')};
     // clone return a new request after updating ,we need to recive the new request and override the old one so we use request=....
   request= request.clone({
      setHeaders:myHeaders
    });
  }

    return next.handle(request);
  }
}
