import { Component, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@ngneat/reactive-forms';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true
    }
  ]
})
export class ImageUploadComponent extends ControlValueAccessor<string | File | null> {
  private readonly _currentValue$ = new BehaviorSubject<string | File | null>(null);
  readonly currentValue$ = this._currentValue$.asObservable();
  readonly valueType$ = this.currentValue$.pipe(
    map(value => {
      if (value instanceof File) return 'file' as const;
      if (typeof value === 'string') return 'url' as const;
      return 'empty' as const;
    })
  )
  readonly fileName$ = this.currentValue$.pipe(
    map(value => {
      if (typeof value === 'string') return value.split(/[\\/]/).reverse()[0];
      if (value instanceof File) return value.name;
      return '';
    })
  )

  onFileInput(event: Event): void {
    const file = (event?.target as HTMLInputElement)?.files?.item(0) ?? null;
    this.addUserValue(file);
  }

  removeLogo(): void {
    this.addUserValue(null);
  }
  
  writeValue(value: string | File | null): void {
    this._currentValue$.next(value);
  }

  private addUserValue(value: File | null): void {
    this._currentValue$.next(value);
    this.onChange?.(value);
    this.onTouched?.();
  }
}
