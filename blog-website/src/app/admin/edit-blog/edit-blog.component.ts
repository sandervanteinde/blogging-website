import { ThrowStmt } from '@angular/compiler';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder } from '@ngneat/reactive-forms';
import { BehaviorSubject, combineLatest, Observable, of, Subscription, throwError } from 'rxjs';
import { debounceTime, filter, map, skip, switchMap, tap } from 'rxjs/operators';
import { UntilDestroyed } from 'src/app/utils/until-destroyed';
import { AdminService } from '../admin.service';
import { Category } from '../models/category';

export interface BlogForm {
  id: string;
  title: string;
  markdownContent: string;
  shortDescription: string;
  logoUrl: string;
  categories: Array<Category>;
}
@Component({
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent extends UntilDestroyed implements OnInit {
  private readonly _updateCategories$ = new BehaviorSubject<void>(undefined);
  state: 'dirty' | 'saving' | 'saved' | 'pristine' = 'pristine';
  addingCategory = false;

  readonly allCategories$ = this._updateCategories$.pipe(switchMap(() => this._adminService.getCategories()));

  readonly newCategory = this._formBuilder.group<{name: string}>({
    name: this._formBuilder.control('', [Validators.required])
  });

  readonly blogForm = this._formBuilder.group<BlogForm>({
    id: this._formBuilder.control('', [Validators.required]),
    title: this._formBuilder.control('', [Validators.required, Validators.maxLength(200)]),
    markdownContent: this._formBuilder.control('', [Validators.required]),
    shortDescription: this._formBuilder.control('', [Validators.required, Validators.maxLength(1000)]),
    logoUrl: this._formBuilder.control('', [Validators.required, Validators.maxLength(200)]),
    categories: this._formBuilder.array([])
  });

  readonly availableCategories$ = combineLatest([
    this.blogForm.value$.pipe(map(value => value.categories)),
    this.allCategories$
  ]).pipe(
    map(([selectedCategories, allCategories]) => {
      var newSet = new Map(allCategories.map(e => ([e.id, e])));
      for(const category of selectedCategories) newSet.delete(category.id);
      return Array.from(newSet.values());
    })
  );

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
      });

      const categories = this.blogForm.getControl('categories') as FormArray<Category>;
      categories.clear();
      newBlog.categories.forEach(category => categories.push(this._formBuilder.control(category)));

      subscription = this.blogForm.value$.pipe(
        skip(1),
        tap(() => this.state = 'dirty'),
        debounceTime(1000),
        tap(() => this.state = 'saving'),
        switchMap(() => this.doSave())
      ).subscribe(() => this.state = 'saved');
    });
  }

  createCategory(): void {
    const newCategory = this.newCategory.value;
    this._adminService.createCategory(newCategory.name).subscribe({
      next: () => {
        this._updateCategories$.next();
        this.newCategory.reset({name: ''});
        this.addingCategory = false;
      },
      error: () => alert('Something went wrong adding the category')
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

  addCategory(category: Category): void {
    (this.blogForm.getControl('categories') as FormArray<Category>).push(this._formBuilder.control(category));
  }

  removeCategory(category: Category): void {
    (this.blogForm.getControl('categories') as FormArray<Category>).removeWhen(e => e.value.id === category.id);
  }

  private doSave(): Observable<unknown> {
    const { id, markdownContent, title, logoUrl, shortDescription, categories } = this.blogForm.value;
    return this._adminService.patchBlog(id, { newBlogContents: {logoUrl, title, markdownContent, shortDescription, categoryIds: categories.map(c => c.id) } });
  }
}
