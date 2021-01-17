import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoginService {
  private returnRouted?: ActivatedRouteSnapshot;

  readonly isLoggedIn$ = new BehaviorSubject<boolean>(false);
  get isLoggedIn(): boolean { return this.isLoggedIn$.value; }

  constructor(private readonly _router: Router) {
    
  }

  setReturnRoute(activatedRoute: ActivatedRouteSnapshot): void {
    this.returnRouted = activatedRoute;
  }

  doLogin(password: string): Observable<boolean> {
    if(password === 'hallo') {
      this.isLoggedIn$.next(true);
      const pathCommands = this.constructPathCommands();
      this._router.navigate(pathCommands);
      return of(true);
    }
    return of(false);
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
