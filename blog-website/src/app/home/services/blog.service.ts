import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Blog, BlogListItem } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getBlogs({index, amount }: {index?: number, amount?: number} = {}): Observable<BlogListItem[]> {
    index = index ?? 0;
    amount = amount ?? 10;
    return this._httpClient.get<BlogListItem[]>(`${environment.apiUrl}/blogs`, {
      params: { index: index.toString(), amount: amount.toString() }
    })
  }

  getBlogByTitle(title: string): Observable<Blog> {
    return this._httpClient.get<Blog>(`${environment.apiUrl}/blogs/${title}`);
  }
}
