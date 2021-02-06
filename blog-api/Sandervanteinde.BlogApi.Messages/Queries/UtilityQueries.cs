using MediatR;

namespace Sandervanteinde.BlogApi.Messages.Queries
{
    public record UrlFriendlyStringQuery(string Url) : IRequest<string>;
}
