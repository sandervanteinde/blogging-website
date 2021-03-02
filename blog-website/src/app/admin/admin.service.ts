import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../utils/api-url';
import { AdminBlog } from './models/admin-blog';
import { Category } from './models/category';

interface PatchBlogModel {
  newStatus?: AdminBlog['status'];
  newBlogContents?: {
    logoUrl?: string;
    markdownContent: string;
    shortDescription: string;
    title: string;
    categoryIds: Array<string>
  }
}

@Injectable()
export class AdminService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(API_URL) private readonly _apiUrl: string
  ) { }

  getBlogs(): Observable<AdminBlog[]> {
    return this._httpClient.get<AdminBlog[]>(`${this._apiUrl}/admin/blogs`);
  }

  getBlogById(blogId: string): Observable<AdminBlog> {
    return this._httpClient.get<AdminBlog>(`${this._apiUrl}/admin/blogs/${blogId}`);
  }

  newBlog(): Observable<string> {
    return this._httpClient.post(`${this._apiUrl}/admin/blogs`, {}) as Observable<string>;
  }

  uploadLogo(id: string, file: File): Observable<{newLogoUrl: string}> {
    const formData = new FormData();
    formData.append('logo', file, file.name);
    return this._httpClient.put<{newLogoUrl: string}>(`${this._apiUrl}/admin/blogs/${id}/logo`, formData);
  }

  patchBlog(id: string, body: PatchBlogModel): Observable<unknown> {
    return this._httpClient.patch(`${this._apiUrl}/admin/blogs/${id}`, body);
  }

  deleteBlog(id: string): Observable<unknown> {
    return this._httpClient.delete(`${this._apiUrl}/admin/blogs/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this._httpClient.get<Category[]>(`${this._apiUrl}/admin/categories`);
  }

  createCategory(categoryName: string): Observable<unknown> {
    return this._httpClient.post(`${this._apiUrl}/admin/categories`, { categoryName });
  }
}
