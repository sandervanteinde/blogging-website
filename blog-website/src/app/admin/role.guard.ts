import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Role, UserService } from '../utils/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private readonly _userService: UserService){ 

  }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    let roles = route?.data?.roles as Array<Role> | Role;
    if(!roles) return true;
    const rolesAsArray = Array.isArray(roles) ? roles : [roles];
    
    return this._userService.roles$.pipe(
      first(),
      map(userRoles => rolesAsArray.some(role => userRoles.includes(role)))
    );
  }
  
}
