using System;
using System.Collections.Generic;

namespace Sandervanteinde.BlogApi.Database.Entities
{

    // public record BlogListItem(Guid Id, string Title, string LogoUrl, string ShortDescription);
    public class Blog
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string LogoUrl { get; set; } = null!;
        public string ShortDescription { get; set; } = null!;
        public string MarkdownContent { get; set; } = null!;
        public BlogStatus Status { get; set; }
        public DateTime? DatePublished { get; set; }
        public List<BlogUrl> BlogUrls { get; set; } = null!;
        public List<BlogCategory> Categories { get; set; } = null!;
        public enum BlogStatus
        {
            // database field is max 20 characters
            Draft,
            Published
        }
    }
}
