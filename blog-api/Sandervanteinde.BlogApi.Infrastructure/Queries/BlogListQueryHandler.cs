using MediatR;
using Microsoft.EntityFrameworkCore;
using Sandervanteinde.BlogApi.Database;
using Sandervanteinde.BlogApi.Messages.Models;
using Sandervanteinde.BlogApi.Messages.Queries;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Infrastructure.Queries
{
    internal class BlogListQueryHandler : IRequestHandler<BlogListQuery, IReadOnlyCollection<BlogListItem>>
    {
        private readonly BlogContext context;

        public BlogListQueryHandler(BlogContext context)
        {
            this.context = context;
        }
        public async Task<IReadOnlyCollection<BlogListItem>> Handle(BlogListQuery request, CancellationToken cancellationToken)
        {
            return await context.Blogs
                .Where(b => b.Status == Database.Entities.Blog.BlogStatus.Published)
                .OrderByDescending(b => b.DatePublished)
                .Skip(request.StartIndex)
                .Take(request.Amount)
                .Select(blog => new BlogListItem(blog.Id, blog.Title, blog.LogoUrl, blog.ShortDescription, blog.BlogUrls.First().UrlFriendlyTitle))
                .ToListAsync(cancellationToken);
        }
    }
}
