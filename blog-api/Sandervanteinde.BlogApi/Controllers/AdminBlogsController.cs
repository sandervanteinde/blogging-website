using MediatR;
using Microsoft.AspNetCore.Mvc;
using Sandervanteinde.BlogApi.Authorization;
using Sandervanteinde.BlogApi.Messages.Commands;
using Sandervanteinde.BlogApi.Messages.Models;
using Sandervanteinde.BlogApi.Messages.Queries;
using Sandervanteinde.BlogApi.Models;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Controllers
{
    [Route("api/admin/blogs")]
    [PermissionAuthorize("Blogs")]
    public class AdminBlogsController : ControllerBase
    {
        private readonly IMediator mediator;

        public AdminBlogsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<AdminBlogListItem[]>> GetBlogs(CancellationToken cancellationToken)
        {
            var query = new AdminBlogListQuery();
            var result = await mediator.Send(query, cancellationToken);
            return result.ToArray();
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateBlogAsync(CancellationToken cancellationToken)
        {
            var command = new CreateBlogCommand();
            var newGuid = await mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(PatchBlog), new { BlogId = newGuid }, newGuid);
        }

        [HttpGet("{blogId:guid}")]
        public async Task<ActionResult<AdminBlog>> GetBlogById([FromRoute] Guid blogId, CancellationToken cancellationToken)
        {
            var query = new AdminBlogByIdQuery(blogId);
            var result = await mediator.Send(query, cancellationToken);
            return result;
        }

        [HttpPatch("{blogId:guid}")]
        public async Task<IActionResult> PatchBlog(
            [FromRoute] Guid blogId,
            [FromBody] PatchBlogModel body,
            CancellationToken cancellationToken
        )
        {
            if (body.NewStatus is not null)
            {
                var updateStatusCommand = new UpdateBlogStatusCommand(blogId, body.NewStatus.Value);
                await mediator.Send(updateStatusCommand, cancellationToken);
            }

            if (body.NewBlogContents is not null)
            {
                var command = body.NewBlogContents.ToCommand(blogId);
                await mediator.Send(command, cancellationToken);
            }

            return NoContent();
        }

        [HttpPut("{blogId:guid}/logo")]
        public async Task<ActionResult<LogoUploadResult>> UpdateBlogLogo(
            [FromRoute] Guid blogId,
            [FromForm] NewBlogLogo newLogo,
            CancellationToken cancellationToken
        )
        {
            var updateLogoCommand = newLogo.ToCommand(blogId);
            var newUri = await mediator.Send(updateLogoCommand, cancellationToken);
            return new LogoUploadResult(newUri);
        }

        [HttpDelete("{blogId:guid}")]
        public async Task<IActionResult> DeleteBlog([FromRoute] Guid blogId, CancellationToken cancellationToken)
        {
            var deleteBlogCommand = new DeleteBlogCommand(blogId);
            await mediator.Send(deleteBlogCommand, cancellationToken);
            return NoContent();
        }

        public record LogoUploadResult(string NewLogoUrl);
    }
}
