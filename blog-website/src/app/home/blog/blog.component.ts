import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { of, throwError } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { BlogService } from '../services/blog.service';

@Component({
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  readonly blog$ = this._activatedRoute.paramMap.pipe(
    switchMap(params => {
      if(!params.has('blogTitle')) return throwError('The blog title route parameter was missing');
      return this._blogService.getBlogByTitle(params.get('blogTitle')!);
    }),
    shareReplay(1)
  );

  readonly isNotFoundError$ = this.blog$.pipe(
    map(() => false),
    catchError(err => of(err instanceof HttpErrorResponse && err.status === 404)),
  );

  readonly isGenericError$ = this.blog$.pipe(
    map(() => false),
    catchError(err => of(!(err instanceof HttpErrorResponse) || err.status !== 404))
  )
  constructor(
    private readonly _blogService: BlogService,
    private readonly _activatedRoute: ActivatedRoute
  ) { }
}
