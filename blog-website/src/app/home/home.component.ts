import { Component, ChangeDetectionStrategy } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, pluck, shareReplay } from 'rxjs/operators';
import { BlogService } from './services/blog.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  private readonly _allHomePageBlogs$ = this._blogService.getBlogs({amount: 7}).pipe(shareReplay(1));
  readonly areBlogsUnavailable$ = this._allHomePageBlogs$.pipe(
    map(blogs => blogs.length === 0),
    catchError(() => of(true))
  );
  readonly highlightedBlog$ = this._allHomePageBlogs$.pipe(pluck(0));
  readonly blogs$ = this._allHomePageBlogs$.pipe(map(([, ...blogs]) => blogs));

  constructor(
    private readonly _blogService: BlogService
  ) { }
}
