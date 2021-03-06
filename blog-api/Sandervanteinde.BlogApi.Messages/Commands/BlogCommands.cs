﻿using MediatR;
using Microsoft.AspNetCore.Http;
using Sandervanteinde.BlogApi.Messages.Models;
using System;
using System.Collections.Generic;

namespace Sandervanteinde.BlogApi.Messages.Commands
{
    public record CreateBlogCommand() : IRequest<Guid>;
    public record UpdateBlogStatusCommand(Guid Id, BlogStatus NewStatus) : IRequest;
    public record DeleteBlogCommand(Guid Id) : IRequest;
    public record UpdateBlogContentsCommand(Guid Id, string MarkdownContent, string ShortDescription, string Title, IReadOnlyCollection<Guid> CategoryIds) : IRequest;
    public record UpdateBlogLogoCommand(Guid Id, IFormFile Logo) : IRequest<string>;
}
