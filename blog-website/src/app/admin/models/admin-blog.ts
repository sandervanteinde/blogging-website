import { Blog } from 'src/app/home/models/blog';

export interface AdminBlog extends Blog {
  status: 'published' | 'draft'
}
