import { Injectable } from '@angular/core';
import type * as JsonConfigValue from '../assets/config.json';

@Injectable({providedIn: 'root'})
export class EnvironmentService {
  private _apiValue?: typeof JsonConfigValue;
  get apiHost() {
    return this._apiValue?.webHost;
  }

  initialize(): (() => Promise<void>) {
    return async () => {
      var response = await fetch('/assets/config.json');
      var body = await response.json() as typeof JsonConfigValue;
      this._apiValue = body;
    }
  }
}
