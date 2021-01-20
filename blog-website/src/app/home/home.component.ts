import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map, pluck } from 'rxjs/operators';
import { BlogService } from './services/blog.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  private readonly _allHomePageBlogs$ = this._blogService.getBlogs({amount: 7});
  readonly highlightedBlog$ = this._allHomePageBlogs$.pipe(pluck(0));
  readonly blogs$ = this._allHomePageBlogs$.pipe(map(([, ...blogs]) => blogs));

  constructor(
    private readonly _blogService: BlogService
  ) { }
}
