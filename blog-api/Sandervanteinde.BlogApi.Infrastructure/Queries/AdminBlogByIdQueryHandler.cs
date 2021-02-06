
using MediatR;
using Microsoft.EntityFrameworkCore;
using Sandervanteinde.BlogApi.Database;
using Sandervanteinde.BlogApi.Infrastructure.MappingExtensions;
using Sandervanteinde.BlogApi.Messages.Models;
using Sandervanteinde.BlogApi.Messages.Queries;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Infrastructure.Queries
{
    internal class AdminBlogByIdQueryHandler : IRequestHandler<AdminBlogByIdQuery, AdminBlog>
    {
        private readonly BlogContext context;

        public AdminBlogByIdQueryHandler(BlogContext context)
        {
            this.context = context;
        }
        public Task<AdminBlog> Handle(AdminBlogByIdQuery request, CancellationToken cancellationToken)
        {
            return context.Blogs
                .Where(blog => blog.Id == request.BlogId)
                .Select(blog => new AdminBlog(blog.Id, blog.Title, blog.LogoUrl, blog.ShortDescription, blog.Status.ToModel(), blog.MarkdownContent))
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}
