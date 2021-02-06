using MediatR;
using Microsoft.AspNetCore.Mvc;
using Sandervanteinde.BlogApi.Messages.Models;
using Sandervanteinde.BlogApi.Messages.Queries;
using Sandervanteinde.BlogApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Controllers
{
    [Route("api/blogs")]
    public class BlogController : ControllerBase
    {
        private readonly IMediator mediator;

        public BlogController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<BlogListItem>>> GetBlogsAsync([FromQuery] NullableBlogQuery query, CancellationToken cancellationToken)
        {
            var result = await mediator.Send(query.ToQuery(), cancellationToken);
            return result.ToArray();
        }

        [HttpGet("{blogTitle}")]
        public async Task<ActionResult<Blog>> GetBlogByTitle(string blogTitle, CancellationToken cancellationToken)
        {
            var blog = await mediator.Send(new BlogByTitleQuery(blogTitle), cancellationToken);
            if (blog is null) return NotFound();
            return blog;
        }
    }
}
