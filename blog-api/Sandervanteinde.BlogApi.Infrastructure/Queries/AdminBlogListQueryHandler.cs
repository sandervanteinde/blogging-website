using MediatR;
using Microsoft.EntityFrameworkCore;
using Sandervanteinde.BlogApi.Database;
using Sandervanteinde.BlogApi.Infrastructure.MappingExtensions;
using Sandervanteinde.BlogApi.Messages.Models;
using Sandervanteinde.BlogApi.Messages.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Infrastructure.Queries
{
    internal class AdminBlogListQueryHandler : IRequestHandler<AdminBlogListQuery, IReadOnlyCollection<AdminBlogListItem>>
    {
        private readonly BlogContext context;

        public AdminBlogListQueryHandler(BlogContext context)
        {
            this.context = context;
        }

        public async Task<IReadOnlyCollection<AdminBlogListItem>> Handle(AdminBlogListQuery request, CancellationToken cancellationToken)
        {
            return await context.Blogs
                .OrderByDescending(b => b.DatePublished)
                .Select(b => new AdminBlogListItem(b.Id, b.Title, b.ShortDescription, b.Status.ToModel(), b.BlogUrls.FirstOrDefault().UrlFriendlyTitle))
                .ToListAsync(cancellationToken);
        }
    }
}
