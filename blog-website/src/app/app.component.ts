import { Component } from '@angular/core';
import { LoginService } from './admin/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog-website';

  readonly isAdmin$ = this._loginService.isLoggedIn$;
  
  constructor(private readonly _loginService: LoginService) { }
}
