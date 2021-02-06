using MediatR;
using Sandervanteinde.BlogApi.Database;
using Sandervanteinde.BlogApi.Messages.Commands;
using System;
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
            request.Deconstruct(out var id, out var logoUrl, out var markdownContent, out var shortDescription, out var title);

            var blog = await context.Blogs.FindAsync(new object[] { id }, cancellationToken);
            if(blog is null)
            {
                throw new InvalidOperationException("Blog did not exist");
            }

            if(blog.Status == Database.Entities.Blog.BlogStatus.Published)
            {
                throw new InvalidOperationException("Can't edit a published blog");
            }

            blog.LogoUrl = logoUrl;
            blog.MarkdownContent = markdownContent;
            blog.ShortDescription = shortDescription;
            blog.Title = title;
            await context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
