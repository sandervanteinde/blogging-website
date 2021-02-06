import { Component, ChangeDetectionStrategy, Input, Renderer2, ElementRef, SimpleChanges, HostBinding } from '@angular/core';

@Component({
  selector: '[app-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input('app-button') theme = 'default';

  @HostBinding('attr.role') readonly role = 'button';

  constructor(private readonly _elementRef: ElementRef<HTMLElement>, private readonly _renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    const element = this._elementRef.nativeElement;
    const { theme } = changes;
    if (theme) {
      const { previousValue, currentValue } = theme;
      // The actual value should fall back to default when the string is empty (just using a directive selector)
      const actualCurrentValue = currentValue === '' ? 'default' : currentValue;
      if (previousValue) this._renderer.removeClass(element, this.className(previousValue));
      if (actualCurrentValue) this._renderer.addClass(element, this.className(actualCurrentValue));
    }
  }

  className(theme: string): string {
    return `button--${theme}`;
  }
}
