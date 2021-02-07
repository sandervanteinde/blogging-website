using MediatR;
using Microsoft.EntityFrameworkCore;
using Sandervanteinde.BlogApi.Database;
using Sandervanteinde.BlogApi.Messages.Models;
using Sandervanteinde.BlogApi.Messages.Queries;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Infrastructure.Queries
{
    internal class BlogByTitleQueryHandler : IRequestHandler<BlogByTitleQuery, Blog>
    {
        private readonly BlogContext context;

        public BlogByTitleQueryHandler(BlogContext context)
        {
            this.context = context;
        }
        public async Task<Blog> Handle(BlogByTitleQuery request, CancellationToken cancellationToken)
        {
            request.Deconstruct(out var title);
            var blog = await context.BlogUrls
                .Where(url => url.UrlFriendlyTitle == title && url.Blog.Status == Database.Entities.Blog.BlogStatus.Published)
                .Select(url => new Blog(
                    url.Blog.Id,
                    url.Blog.Title,
                    url.Blog.LogoUrl,
                    url.Blog.ShortDescription,
                    url.Blog.MarkdownContent,
                    url.Blog.Categories.Select(c => c.Category).ToList()
                ))
                .FirstOrDefaultAsync(cancellationToken);

            return blog;
        }
    }
}
