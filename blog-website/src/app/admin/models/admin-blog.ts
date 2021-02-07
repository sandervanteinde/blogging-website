import { Category } from './category';

export interface AdminBlog {
  id: string;
  title: string;
  logoUrl: string;
  shortDescription: string;
  status: 'published' | 'draft'
  markdownContent: string;
  categories: Array<Category>;
}

// Guid Id, string Title, string LogoUrl, string ShortDescription, BlogStatus Status, string MarkdownContent, IReadOnlyCollection<Category> Categories
