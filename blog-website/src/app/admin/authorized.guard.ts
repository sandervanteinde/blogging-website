import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthorizedGuard implements CanActivate {
  constructor(private readonly _loginService: LoginService, private readonly _router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    if(!this._loginService.isLoggedIn) {
      this._loginService.setReturnRoute(route);
      return this._router.parseUrl('/admin/login');
    }
    return true;
  }
  
}
