import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './admin/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog-website';

  readonly isAdmin$ = this._loginService.isLoggedIn$;
  
  constructor(
    private readonly _loginService: LoginService,
    private readonly _router: Router
  ) { }

  clickB(event: MouseEvent): void {
    if(event.shiftKey && event.ctrlKey && event.altKey) {
      this._router.navigate(['/admin']);
    }
  }
}
