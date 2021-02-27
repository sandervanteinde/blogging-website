import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, ErrorObserver, NextObserver } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { AdminService } from '../../admin.service';
import { AdminBlog } from '../../models/admin-blog';

@Component({
  selector: 'app-blog-table',
  templateUrl: './blog-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogTableComponent {
  private readonly _update$ = new BehaviorSubject<void>(undefined);
  readonly blogs$ = this._update$.pipe(
    switchMap(() => this._adminService.getBlogs()),
    shareReplay(1)
  );

  constructor(private readonly _adminService: AdminService) { }

  toggleStatus(blog: AdminBlog): void {
    let newStatus: AdminBlog['status'];
    switch(blog.status) {
      case 'draft':
        newStatus = 'published';
        break;
      case 'published':
        newStatus = 'draft';
        break;
    }
    this._adminService.patchBlog(blog.id, { newStatus }).subscribe(this.refreshSubscribable(`Something happened while updating the blog status to ${newStatus}`));
  }

  deleteBlog(blog: AdminBlog): void {
    this._adminService.deleteBlog(blog.id).subscribe(this.refreshSubscribable('Failed to delete the blog'));
  }

  private refreshSubscribable(error: string): NextObserver<unknown> & ErrorObserver<unknown> {
    return {
      next: () => this._update$.next(),
      error: () => alert(error)
    }
  }
}
