import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from './utils/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog-website';

  readonly isAdmin$ = this._userService.hasAccessToBlogs$;
  readonly isLoggedIn$ = this._auth.isAuthenticated$;
  
  constructor(
    private readonly _router: Router,
    private readonly _userService: UserService,
    private readonly _auth: AuthService
  ) { }

  clickB(event: MouseEvent): void {
    if(event.shiftKey && event.ctrlKey && event.altKey) {
      this._router.navigate(['/admin']);
    }
  }

  logout(): void {
    this._auth.logout({
      returnTo: window.location.origin
    });
  }
}
