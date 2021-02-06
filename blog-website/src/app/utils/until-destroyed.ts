import { Directive, OnDestroy } from '@angular/core';
import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const onDestroySymbol = Symbol('On Destroy');

@Directive()
export class UntilDestroyed implements OnDestroy {
  private [onDestroySymbol] = new Subject<undefined>();

  untilDestroyed<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil(this[onDestroySymbol]);
  }

  ngOnDestroy(): void {
    this[onDestroySymbol].next();
    this[onDestroySymbol].complete();
  }
}
