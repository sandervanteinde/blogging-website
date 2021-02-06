import { Directive, Host, Optional, SkipSelf } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { componentIsTitledComponent, TitledComponent } from '../titled-component';
import { UntilDestroyed } from '../until-destroyed';
import { TitleRegistryService } from './title-registry.service';

@Directive({
  selector: 'router-outlet'
})
export class RouterDirective extends UntilDestroyed {
  private readonly _id: number;
  constructor(
    @Host() routerOutlet: RouterOutlet,
    private readonly _titleRegistryService: TitleRegistryService
  ) {
    super();
    this._id = _titleRegistryService.register();
    routerOutlet.activateEvents.pipe(
      switchMap(e => {
        if(!componentIsTitledComponent(e)) {
          return of('');
        }
        const titleAsObservableOrString = e.getTitleForComponent();
        if(titleAsObservableOrString instanceof Observable) {
          return titleAsObservableOrString;
        }
        return of(titleAsObservableOrString);
      }),
      distinctUntilChanged(),
      this.untilDestroyed()
    ).subscribe(newTitle => _titleRegistryService.setTitle(this._id, newTitle));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._titleRegistryService.unregister(this._id);
  }
}
