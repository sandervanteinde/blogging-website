using Sandervanteinde.BlogApi.Messages.Models;
using System.ComponentModel;

namespace Sandervanteinde.BlogApi.Infrastructure.MappingExtensions
{
    internal static class BlogMappingExtensions
    {
        public static BlogStatus ToModel(this Database.Entities.Blog.BlogStatus status) => status switch
        {
            Database.Entities.Blog.BlogStatus.Published => BlogStatus.Published,
            Database.Entities.Blog.BlogStatus.Draft => BlogStatus.Draft,
            _ => throw new InvalidEnumArgumentException(nameof(status), (int)status, typeof(Database.Entities.Blog.BlogStatus))
        };

        public static Database.Entities.Blog.BlogStatus ToDatabaseModel(this BlogStatus status) => status switch
        {
            BlogStatus.Published => Database.Entities.Blog.BlogStatus.Published,
            BlogStatus.Draft => Database.Entities.Blog.BlogStatus.Draft,
            _ => throw new InvalidEnumArgumentException(nameof(status), (int)status, typeof(BlogStatus))
        };
    }
}
