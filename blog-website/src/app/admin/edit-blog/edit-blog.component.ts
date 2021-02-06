import { ThrowStmt } from '@angular/compiler';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@ngneat/reactive-forms';
import { Observable, Subscription, throwError } from 'rxjs';
import { debounceTime, filter, map, skip, switchMap, tap } from 'rxjs/operators';
import { UntilDestroyed } from 'src/app/utils/until-destroyed';
import { AdminService } from '../admin.service';

export interface BlogForm {
  id: string;
  title: string;
  markdownContent: string;
  shortDescription: string;
  logoUrl: string;
}
@Component({
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent extends UntilDestroyed implements OnInit {
  blogContents = '# The title<br/>Something interesting';
  state: 'dirty' | 'saving' | 'saved' | 'pristine' = 'pristine';

  readonly blogForm = this._formBuilder.group<BlogForm>({
    id: this._formBuilder.control('', [Validators.required]),
    title: this._formBuilder.control('', [Validators.required, Validators.maxLength(200)]),
    markdownContent: this._formBuilder.control('', [Validators.required]),
    shortDescription: this._formBuilder.control('', [Validators.required, Validators.maxLength(1000)]),
    logoUrl: this._formBuilder.control('', [Validators.required, Validators.maxLength(200)])
  });

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _adminService: AdminService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    let subscription: Subscription | undefined;
    this._activatedRoute.paramMap.pipe(
      switchMap(params => {
        if(!params.has('blogId')) return throwError('No blog id parameter present in route');
        return this._adminService.getBlogById(params.get('blogId')!);
      }),
      this.untilDestroyed()
    ).subscribe(newBlog => {
      if (subscription) subscription.unsubscribe();
      this.state = 'pristine';
      this.blogForm.reset({
        id: newBlog.id,
        logoUrl: newBlog.logoUrl,
        markdownContent: newBlog.markdownContent,
        shortDescription: newBlog.shortDescription,
        title: newBlog.title
      }, { emitEvent: false });

      subscription = this.blogForm.value$.pipe(
        skip(1),
        tap(() => this.state = 'dirty'),
        debounceTime(1000),
        tap(() => this.state = 'saving'),
        switchMap(() => this.doSave())
      ).subscribe(() => this.state = 'saved');
    });
  }

  updateBlog(): void {
    if(this.state !== 'dirty') {
      this._router.navigate(['/admin']);
    } else {
      this.doSave().pipe(this.untilDestroyed()).subscribe(() => {
        this._router.navigate(['/admin']);
      })
    }
  }

  private doSave(): Observable<unknown> {
    const { id, markdownContent, title, logoUrl, shortDescription } = this.blogForm.value;
    return this._adminService.patchBlog(id, {newBlogContents: {logoUrl, title, markdownContent, shortDescription } });
  }
}
