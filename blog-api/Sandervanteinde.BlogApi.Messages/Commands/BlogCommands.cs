using MediatR;
using Sandervanteinde.BlogApi.Messages.Models;
using System;

namespace Sandervanteinde.BlogApi.Messages.Commands
{
    public record CreateBlogCommand() : IRequest<Guid>;
    public record UpdateBlogStatusCommand(Guid Id, BlogStatus NewStatus) : IRequest;
    public record DeleteBlogCommand(Guid Id) : IRequest;
    public record UpdateBlogContentsCommand(Guid Id, string LogoUrl, string MarkdownContent, string ShortDescription, string Title) : IRequest;
}
