export interface BlogListItem {
  id: string;
  title: string;
  logoUrl: string;
  shortDescription: string;
  url: string;
}

export interface Blog extends BlogListItem {
  markdownContent: string;
}
