export interface BlogListItem {
  id: string;
  title: string;
  logoUrl: string;
  shortDescription: string;
}

export interface Blog extends BlogListItem {
  markdownContent: string;
}
