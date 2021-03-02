import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageRenderingService {

  constructor(private readonly _domSanitizer: DomSanitizer) { }

  createImageSourceStream(imageSource$: Observable<string | File | null>): Observable<SafeUrl | undefined> {
    const imageUrl$ = imageSource$.pipe(
      switchMap(value => {
        if (typeof value === 'string') return of(this._domSanitizer.bypassSecurityTrustUrl(value));
        if(!(value instanceof File)) return of(undefined);
        return new Observable<SafeUrl>(observer => {
          const reader = new FileReader();
          reader.addEventListener('loadend', () => {
            const blob = new Blob([reader.result as ArrayBuffer]);
            const url = URL.createObjectURL(blob);
            const safeUrl = this._domSanitizer.bypassSecurityTrustUrl(url);
            observer.next(safeUrl);
            observer.complete();
          });
          reader.readAsArrayBuffer(value);
        });
      }));
    return imageUrl$;
  }
}
