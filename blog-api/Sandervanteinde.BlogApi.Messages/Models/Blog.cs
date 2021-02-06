using System;

namespace Sandervanteinde.BlogApi.Messages.Models
{
    public record BlogListItem(Guid Id, string Title, string LogoUrl, string ShortDescription, string Url);
    public record AdminBlogListItem(Guid Id, string Title, string ShortDescription, BlogStatus Status, string? Url);
    public record AdminBlog(Guid Id, string Title, string LogoUrl, string ShortDescription, BlogStatus Status, string MarkdownContent);
    public record Blog(Guid Id, string Title, string LogoUrl, string ShortDescription, string MarkdownContent);
}
