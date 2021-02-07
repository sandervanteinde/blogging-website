using System;
using System.Collections.Generic;

namespace Sandervanteinde.BlogApi.Messages.Models
{
    public record Blog(Guid Id, string Title, string LogoUrl, string ShortDescription, string MarkdownContent, IReadOnlyCollection<string> Categories);
    public record BlogListItem(Guid Id, string Title, string LogoUrl, string ShortDescription, string Url, IReadOnlyCollection<string> Categories);
    public record AdminBlog(Guid Id, string Title, string LogoUrl, string ShortDescription, BlogStatus Status, string MarkdownContent, IReadOnlyCollection<Category> Categories);
    public record AdminBlogListItem(Guid Id, string Title, string ShortDescription, BlogStatus Status, string? Url);
}
