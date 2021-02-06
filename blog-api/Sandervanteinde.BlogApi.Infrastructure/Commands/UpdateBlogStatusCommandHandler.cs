using MediatR;
using Microsoft.EntityFrameworkCore;
using Sandervanteinde.BlogApi.Database;
using Sandervanteinde.BlogApi.Infrastructure.MappingExtensions;
using Sandervanteinde.BlogApi.Messages.Commands;
using Sandervanteinde.BlogApi.Messages.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Infrastructure.Commands
{
    internal class UpdateBlogStatusCommandHandler : IRequestHandler<UpdateBlogStatusCommand>
    {
        private readonly BlogContext context;
        private readonly IMediator mediator;

        public UpdateBlogStatusCommandHandler(
            BlogContext context,
            IMediator mediator
        )
        {
            this.context = context;
            this.mediator = mediator;
        }

        public async Task<Unit> Handle(UpdateBlogStatusCommand request, CancellationToken cancellationToken)
        {
            request.Deconstruct(out var blogId, out var newStatus);
            var blog = await context.Blogs
                .Include(b => b.BlogUrls)
                .FirstOrDefaultAsync(blog => blog.Id == blogId);

            if(blog is null)
            {
                throw new InvalidOperationException("Unknown blog");
            }

            blog.Status = newStatus.ToDatabaseModel();
            if(newStatus == Messages.Models.BlogStatus.Published)
            {
                blog.DatePublished = DateTime.UtcNow;
                var urlSafeTitleQuery = new UrlFriendlyStringQuery(blog.Title);
                var urlSafeTitle = await mediator.Send(urlSafeTitleQuery, cancellationToken);
                if(!blog.BlogUrls.Any(url => url.UrlFriendlyTitle == urlSafeTitle))
                {
                    await context.BlogUrls.AddAsync(new Database.Entities.BlogUrl
                    {
                        Blog = blog,
                        BlogId = blog.Id,
                        UrlFriendlyTitle = urlSafeTitle
                    }, cancellationToken);
                }
            }

            await context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
