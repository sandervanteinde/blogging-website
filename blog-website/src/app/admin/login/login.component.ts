import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormControl } from '@ngneat/reactive-forms';
import { LoginService } from '../login.service';
import { filter, first } from 'rxjs/operators';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  readonly loginForm = this._fb.group<{password: string}>({
    password: ['', [Validators.required]]
  });
  
  showAlert = false;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _loginService: LoginService
  ) { }

  doLogin(): void {
    this._loginService.doLogin(this.loginForm.get(['password']).value).pipe(
      first(),
      filter(val => !val)
    ).subscribe(() => this.showAlert = true);
  }
}
