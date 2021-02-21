import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('The base URL of the API. This contains the /api part of the URL');
