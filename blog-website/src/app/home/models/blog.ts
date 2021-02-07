export interface BlogListItem {
  id: string;
  title: string;
  logoUrl: string;
  shortDescription: string;
  url: string;
  categories: Array<string>;
}

export interface Blog extends BlogListItem {
  markdownContent: string;
}
