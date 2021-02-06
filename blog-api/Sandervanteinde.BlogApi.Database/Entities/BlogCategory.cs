using System;
using System.Collections.Generic;

namespace Sandervanteinde.BlogApi.Database.Entities
{
    public class BlogCategory
    {
        public Guid Id { get; set; }
        public List<Blog> Blogs { get; set; } = null!;
        public string Category { get; set; } = null!;
    }
}
