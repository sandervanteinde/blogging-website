using MediatR;
using Microsoft.EntityFrameworkCore;
using Sandervanteinde.BlogApi.Database;
using Sandervanteinde.BlogApi.Messages.Commands;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Infrastructure.Commands
{
    internal class UpdateBlogContentsCommandHandler : IRequestHandler<UpdateBlogContentsCommand>
    {
        private readonly BlogContext context;

        public UpdateBlogContentsCommandHandler(BlogContext context)
        {
            this.context = context;
        }

        public async Task<Unit> Handle(UpdateBlogContentsCommand request, CancellationToken cancellationToken)
        {
            request.Deconstruct(out var id, out var logoUrl, out var markdownContent, out var shortDescription, out var title, out var categoryIds);

            var blog = await context.Blogs
                .Include(b => b.Categories)
                .FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
            if(blog is null)
            {
                throw new InvalidOperationException("Blog did not exist");
            }

            if(blog.Status == Database.Entities.Blog.BlogStatus.Published)
            {
                throw new InvalidOperationException("Can't edit a published blog");
            }

            var categories = await context.BlogCategories
                .Where(category => categoryIds.Contains(category.Id))
                .ToListAsync(cancellationToken);

            blog.LogoUrl = logoUrl;
            blog.MarkdownContent = markdownContent;
            blog.ShortDescription = shortDescription;
            blog.Title = title;
            blog.Categories = categories;
            await context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
