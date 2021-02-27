import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Permission, UserService } from '../utils/user.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private readonly _userService: UserService){ 

  }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    let roles = route?.data?.permissions as Array<Permission> | Permission;
    if(!roles) return true;
    const rolesAsArray = Array.isArray(roles) ? roles : [roles];
    
    return this._userService.permissions.pipe(
      first(),
      map(userRoles => rolesAsArray.some(role => userRoles.includes(role)))
    );
  }
  
}
