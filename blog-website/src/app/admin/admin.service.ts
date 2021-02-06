import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminBlog } from './models/admin-blog';
import { BlogForm } from './edit-blog/edit-blog.component';
import { map } from 'rxjs/operators';
import { Category } from './models/category';

interface PatchBlogModel {
  newStatus?: AdminBlog['status'];
  newBlogContents?: {
    logoUrl: string;
    markdownContent: string;
    shortDescription: string;
    title: string;
  }
}

@Injectable()
export class AdminService {
  constructor(private readonly _httpClient: HttpClient) {
    
  }

  getBlogs(): Observable<AdminBlog[]> {
    return this._httpClient.get<AdminBlog[]>(`${environment.apiUrl}/admin/blogs`);
  }

  getBlogById(blogId: string): Observable<AdminBlog> {
    return this._httpClient.get<AdminBlog>(`${environment.apiUrl}/admin/blogs/${blogId}`);
  }

  newBlog(): Observable<string> {
    return this._httpClient.post(`${environment.apiUrl}/admin/blogs`, {}) as Observable<string>;
  }

  patchBlog(id: string, body: PatchBlogModel): Observable<unknown> {
    return this._httpClient.patch(`${environment.apiUrl}/admin/blogs/${id}`, body);
  }

  deleteBlog(id: string): Observable<unknown> {
    return this._httpClient.delete(`${environment.apiUrl}/admin/blogs/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this._httpClient.get<Category[]>(`${environment.apiUrl}/admin/categories`);
  }
}
