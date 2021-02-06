using MediatR;

namespace Sandervanteinde.BlogApi.Messages.Commands
{
    public record AddCategoryCommand(string CategoryName) : IRequest;
}
