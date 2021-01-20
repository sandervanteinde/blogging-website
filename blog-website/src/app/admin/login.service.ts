import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, startWith, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class LoginService {
  private returnRouted?: ActivatedRouteSnapshot;
  readonly token$ = new BehaviorSubject<string | undefined>(undefined);
  readonly isLoggedIn$ = this.token$.pipe(map(Boolean));
  get isLoggedIn(): boolean { return Boolean(this.token$.value); }

  constructor(
    private readonly _router: Router,
    private readonly _httpClient: HttpClient
  ) { }

  setReturnRoute(activatedRoute: ActivatedRouteSnapshot): void {
    this.returnRouted = activatedRoute;
  }

  doLogin(password: string): Observable<boolean> {
    return new Observable(observer => {
      const subscription = this._httpClient.post<{token: string}>(`${environment.apiUrl}/login`, { password }).subscribe({
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
