import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable()
export class AuthorizedGuard implements CanActivate {
  constructor(private readonly _auth: AuthService) {

  }
  canActivate(): Observable<boolean> {
    return this._auth.isAuthenticated$.pipe(
      first(),
      map(isAuthenticated => {
        if(isAuthenticated) return true;
        this._auth.loginWithRedirect({scope: 'Blogs'});
        return false;
      })
    )
  }
  
}
