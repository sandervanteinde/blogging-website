using MediatR;
using Sandervanteinde.BlogApi.Database;
using Sandervanteinde.BlogApi.Database.Entities;
using Sandervanteinde.BlogApi.Messages.Commands;
using System.Threading;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Infrastructure.Commands
{
    internal class AddCategoryCommandHandler : IRequestHandler<AddCategoryCommand>
    {
        private readonly BlogContext context;

        public AddCategoryCommandHandler(BlogContext context)
        {
            this.context = context;
        }

        public async Task<Unit> Handle(AddCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = new BlogCategory { Category = request.CategoryName };
            await context.BlogCategories.AddAsync(category, cancellationToken);
            await context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
