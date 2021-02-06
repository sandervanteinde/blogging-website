using MediatR;
using Sandervanteinde.BlogApi.Messages.Models;
using System;
using System.Collections.Generic;

namespace Sandervanteinde.BlogApi.Messages.Queries
{
    public record BlogByTitleQuery(string title): IRequest<Blog>;
    public record BlogListQuery(int StartIndex, int Amount) : IRequest<IReadOnlyCollection<BlogListItem>>;
    public record AdminBlogListQuery() : IRequest<IReadOnlyCollection<AdminBlogListItem>>;
    public record AdminBlogByIdQuery(Guid BlogId) : IRequest<AdminBlog>;
}
