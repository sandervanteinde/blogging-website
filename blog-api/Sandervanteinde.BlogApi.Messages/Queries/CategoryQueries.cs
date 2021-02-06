using MediatR;
using Sandervanteinde.BlogApi.Messages.Models;
using System.Collections.Generic;

namespace Sandervanteinde.BlogApi.Messages.Queries
{
    public record CategoriesQuery() : IRequest<IReadOnlyCollection<Category>>;
}
