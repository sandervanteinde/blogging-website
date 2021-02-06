using MediatR;
using Sandervanteinde.BlogApi.Database;
using Sandervanteinde.BlogApi.Database.Entities;
using Sandervanteinde.BlogApi.Messages.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Infrastructure.Commands
{
    internal class CreateBlogCommandHandler : IRequestHandler<CreateBlogCommand, Guid>
    {
        private readonly BlogContext context;

        public CreateBlogCommandHandler(BlogContext context)
        {
            this.context = context;
        }

        public async Task<Guid> Handle(CreateBlogCommand request, CancellationToken cancellationToken)
        {
            var blog = new Blog
            {
                LogoUrl = @"https://picsum.photos/800/300",
                MarkdownContent = @"This is the content of the blog",
                ShortDescription = @"Some short description used in headings",
                Title = @"New blog"
            };
            await context.Blogs.AddAsync(blog, cancellationToken);
            await context.SaveChangesAsync(cancellationToken);

            return blog.Id;
        }
    }
}
