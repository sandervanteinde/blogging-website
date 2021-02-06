using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sandervanteinde.BlogApi.Authorization;
using Sandervanteinde.BlogApi.Messages.Commands;
using Sandervanteinde.BlogApi.Messages.Models;
using Sandervanteinde.BlogApi.Messages.Queries;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Controllers
{
    [Route("api/admin/categories")]
    [Authorize]
    [AdminAuthorize]
    public class CategoryController : ControllerBase
    {
        private readonly IMediator mediator;

        public CategoryController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<Category[]>> GetCategories(CancellationToken cancellationToken)
        {
            var query = new CategoriesQuery();
            var categories = await mediator.Send(query, cancellationToken);
            return categories.ToArray();
        }

        [HttpPost]
        public async Task<IActionResult> AddCategory(AddCategoryCommand body, CancellationToken cancellationToken)
        {
            await mediator.Send(body, cancellationToken);
            return NoContent();
        }

    }
}
