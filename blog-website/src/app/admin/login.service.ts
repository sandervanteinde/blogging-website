import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../utils/api-url';

@Injectable({providedIn: 'root'})
export class LoginService {
  private returnRouted?: ActivatedRouteSnapshot;
  readonly token$ = new BehaviorSubject<string | undefined>(undefined);
  readonly isLoggedIn$ = this.token$.pipe(map(Boolean));
  get isLoggedIn(): boolean { return Boolean(this.token$.value); }

  constructor(
    private readonly _router: Router,
    private readonly _httpClient: HttpClient,
    @Inject(API_URL) private readonly _apiUrl: string
  ) { }

  setReturnRoute(activatedRoute: ActivatedRouteSnapshot): void {
    this.returnRouted = activatedRoute;
  }

  doLogin(password: string): Observable<boolean> {
    return new Observable(observer => {
      const subscription = this._httpClient.post<{token: string}>(`${this._apiUrl}/login`, { password }).subscribe({
        next: response => {
          this.token$.next(response.token);
          observer.next(true);
          observer.complete();
          const pathCommands = this.constructPathCommands();
          this._router.navigate(pathCommands);
        },
        error: err => observer.error(err)
      });
      return subscription;
    });
  }

  private constructPathCommands(): Array<string> {
    const paths = ['/'] as Array<string>;
    if(!this.returnRouted) return paths;
    let path: ActivatedRouteSnapshot | null = this.returnRouted.root;
    while(path) {
      path.url.forEach(segment => paths.push(segment.path));
      path = path.firstChild;
    }
    return paths;
  }
}
