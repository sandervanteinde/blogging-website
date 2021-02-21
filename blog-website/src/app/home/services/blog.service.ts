import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/utils/api-url';
import { Blog, BlogListItem } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(API_URL) private readonly _apiUrl: string
  ) { }

  getBlogs({index, amount }: {index?: number, amount?: number} = {}): Observable<BlogListItem[]> {
    index = index ?? 0;
    amount = amount ?? 10;
    return this._httpClient.get<BlogListItem[]>(`${this._apiUrl}/blogs`, {
      params: { index: index.toString(), amount: amount.toString() }
    })
  }

  getBlogByTitle(title: string): Observable<Blog> {
    return this._httpClient.get<Blog>(`${this._apiUrl}/blogs/${title}`);
  }
}
