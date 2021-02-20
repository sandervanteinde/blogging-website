using System;

namespace Sandervanteinde.BlogApi.Database.Entities
{
    public class BlogUrl
    {
        public Guid Id { get; set; }
        public Guid BlogId { get; set; }
        public Blog Blog { get; set; } = null!;
        public string UrlFriendlyTitle { get; set; } = null!;
    }
}
