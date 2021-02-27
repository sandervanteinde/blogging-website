import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { filter, map, pluck } from 'rxjs/operators';

const permissionId = 'https://sandervanteinde.nl/permissions';
const roles = ['Blogs', 'Images'] as const;
export type Permission = typeof roles[number];
interface IdTokenClaims {
  [permissionId]: Array<Permission>
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _claims = this._auth.idTokenClaims$.pipe(filter(Boolean)) as Observable<IdTokenClaims>;
  readonly hasAccessToBlogs$ = this._claims.pipe(
    map(roles => roles[permissionId].includes('Blogs'))
  )

  readonly permissions = this._claims.pipe(pluck(permissionId));
  constructor(private readonly _auth: AuthService) { }
}
