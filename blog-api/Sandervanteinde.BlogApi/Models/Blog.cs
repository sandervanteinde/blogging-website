using System;

namespace Sandervanteinde.BlogApi.Models
{
    public record BlogQuery(int? StartIndex, int? Amount)
    {
        public BlogQuery WithDefaultsFilled() => this with
        {
            StartIndex = StartIndex ?? 0,
            Amount = Amount ?? 10
        };
    }
    public record BlogListItem(Guid Id, string Title, string LogoUrl, string ShortDescription);

    public record Blog : BlogListItem
    {
        public string MarkdownContent { get; }
        public Blog(Guid id, string title, string logoUrl, string shortDescription, string markdownContent)
            : base(id, title, logoUrl, shortDescription)
        {
            MarkdownContent = markdownContent;
        }
    }
}
