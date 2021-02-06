using MediatR;
using Sandervanteinde.BlogApi.Database;
using Sandervanteinde.BlogApi.Messages.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Infrastructure.Commands
{
    internal class DeleteBlogCommandHandler : IRequestHandler<DeleteBlogCommand>
    {
        private readonly BlogContext context;

        public DeleteBlogCommandHandler(BlogContext context)
        {
            this.context = context;
        }

        public async Task<Unit> Handle(DeleteBlogCommand request, CancellationToken cancellationToken)
        {
            var blog = await context.Blogs.FindAsync(new object[] { request.Id }, cancellationToken);
            if(blog is null)
            {
                throw new InvalidOperationException("Blog did not exist");
            }
            if (blog.Status != Database.Entities.Blog.BlogStatus.Draft)
            {
                throw new InvalidOperationException("Blog may not be deleted when it is not in a draft state");
            }
            context.Blogs.Remove(blog);
            await context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
