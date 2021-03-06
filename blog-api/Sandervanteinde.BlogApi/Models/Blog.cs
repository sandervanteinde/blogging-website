﻿using Microsoft.AspNetCore.Http;
using Sandervanteinde.BlogApi.Messages.Commands;
using Sandervanteinde.BlogApi.Messages.Models;
using Sandervanteinde.BlogApi.Messages.Queries;
using System;

namespace Sandervanteinde.BlogApi.Models
{
    public record NullableBlogQuery(int? StartIndex, int? Amount)
    {
        public BlogListQuery ToQuery() => new(StartIndex ?? 0, Amount ?? 10);
    }

    public record NewBlogLogo(IFormFile Logo)
    {
        public UpdateBlogLogoCommand ToCommand(Guid blogId) => new(blogId, Logo);
    };
    public record PatchBlogModel(BlogStatus? NewStatus, NewBlogItem? NewBlogContents);
    public record NewBlogItem(string MarkdownContent, string ShortDescription, string Title, Guid[] CategoryIds)
    {
        public UpdateBlogContentsCommand ToCommand(Guid id) => new(id, MarkdownContent, ShortDescription, Title, CategoryIds);
    };
}
