import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { filter, map, pluck } from 'rxjs/operators';

const roleClaimId = 'https://sandervanteinde.nl/roles';
const roles = ['Blog Admin'] as const;
export type Role = typeof roles[number];
interface IdTokenClaims {
  [roleClaimId]: Array<Role>
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _claims = this._auth.idTokenClaims$.pipe(filter(Boolean)) as Observable<IdTokenClaims>;
  readonly hasAccessToBlogs$ = this._claims.pipe(
    map(roles => roles[roleClaimId].includes('Blog Admin'))
  )

  readonly roles$ = this._claims.pipe(pluck(roleClaimId));
  constructor(private readonly _auth: AuthService) { }
}
