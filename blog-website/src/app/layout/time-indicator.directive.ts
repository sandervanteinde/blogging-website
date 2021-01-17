import { Directive, ElementRef, Input, NgModuleFactoryLoader, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTimeIndicator]'
})
export class TimeIndicatorDirective implements OnChanges {

  @Input('appTimeIndicator') time: string | Date = '';

  constructor(private readonly _elementRef: ElementRef<HTMLElement>) { }

  ngOnChanges(changes: SimpleChanges): void {
    const time = changes.time;
    if(time) {
      const newValue = time.currentValue instanceof Date ? time.currentValue : new Date(time.currentValue);
      this._elementRef.nativeElement.innerHTML = this.textForTimeDiff(newValue);
    }
  }

  private textForTimeDiff(date: Date): string {
    const currentDate = new Date();
    const diffInSeconds = (currentDate.getTime() - date.getTime()) / 1000;
    const formattedDate = date.toLocaleString();
    this._elementRef.nativeElement.setAttribute('title', formattedDate);
    if(diffInSeconds < 60) {
      return `${Math.floor(diffInSeconds)} second${diffInSeconds < 2 ? '' : 's'} ago`;
    }
    const diffInMinutes = diffInSeconds / 60;
    if(diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)} minute${diffInMinutes < 2 ? '' : 's'} ago`;
    }

    const diffInHours = diffInMinutes / 60;
    if(diffInHours < 24) {
      return `${Math.floor(diffInHours)} hour${diffInHours < 2 ? '' : 's'} ago`;
    }

    const diffInDays = diffInHours / 24;
    if(diffInDays < 2) {
      return 'Yesterday';
    }

    if(diffInDays < 10) {
      return `${Math.floor(diffInDays)} days ago`;
    }

    return formattedDate;
  }
}
