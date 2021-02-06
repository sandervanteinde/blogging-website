import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

const websiteName = 'Sander\'s blog';

@Injectable({providedIn: 'root'})
export class TitleRegistryService {
  private static registrationNumber = 0;

  private readonly _titles = new Map<number, string>();

  private _update$ = new BehaviorSubject<void>(undefined);
  constructor(title: Title) {
    this._update$.pipe(
      map(() => this.getCurrentTitle()),
      distinctUntilChanged()
    ).subscribe(newTitle => {
      title.setTitle(newTitle ? `${newTitle} - ${websiteName}` : websiteName);
    })
  }
  register(): number {
    return ++TitleRegistryService.registrationNumber;
  }

  setTitle(id: number, title: string): void {
    this._titles.set(id, title);
    this._update$.next();
  }

  unregister(id: number): void {
    if(this._titles.delete(id)) this._update$.next();
  }

  private getCurrentTitle(): string | undefined {
    let lowestId = Number.MAX_VALUE;
    let result: string | undefined;
    for(const [id, value] of this._titles) {
      if(id < lowestId && value) {
        result = value;
        lowestId = id;
      }
    }
    return result;
  }
}
