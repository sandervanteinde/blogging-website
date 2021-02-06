import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { LoginService } from '../login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly _loginService: LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._loginService.token$.pipe(first()).pipe(
      switchMap(token => {
        let newRequest = req;
        if (token) {
          newRequest = newRequest.clone({
            headers: req.headers.append('Authorization', `Bearer ${token}`)
          });
        }
        return next.handle(newRequest);
      })
    )
  }

}
