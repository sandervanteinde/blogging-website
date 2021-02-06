using MediatR;
using Microsoft.EntityFrameworkCore;
using Sandervanteinde.BlogApi.Database;
using Sandervanteinde.BlogApi.Messages.Models;
using Sandervanteinde.BlogApi.Messages.Queries;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Infrastructure.Queries
{
    internal class CategoriesQueryHandler : IRequestHandler<CategoriesQuery, IReadOnlyCollection<Category>>
    {
        private readonly BlogContext context;

        public CategoriesQueryHandler(BlogContext context)
        {
            this.context = context;
        }

        public async Task<IReadOnlyCollection<Category>> Handle(CategoriesQuery request, CancellationToken cancellationToken)
        {
            var categories = await context.BlogCategories
                .Select(c => new Category(c.Id, c.Category))
                .ToListAsync(cancellationToken);

            return categories;
        }
    }
}
