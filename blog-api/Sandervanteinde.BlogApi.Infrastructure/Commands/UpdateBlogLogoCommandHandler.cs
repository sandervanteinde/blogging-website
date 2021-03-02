using MediatR;
using Sandervanteinde.BlogApi.Infrastructure.Configuration;
using Sandervanteinde.BlogApi.Messages.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Flurl;
using Flurl.Http;
using Sandervanteinde.BlogApi.Database;

namespace Sandervanteinde.BlogApi.Infrastructure.Commands
{
    internal sealed class UpdateBlogLogoCommandHandler : IRequestHandler<UpdateBlogLogoCommand, string>
    {
        private readonly ImageServiceConfiguration config;
        private readonly BlogContext blogContext;

        public UpdateBlogLogoCommandHandler(
            ImageServiceConfiguration config,
            BlogContext blogContext
        )
        {
            this.config = config;
            this.blogContext = blogContext;
        }

        public async Task<string> Handle(UpdateBlogLogoCommand request, CancellationToken cancellationToken)
        {
            request.Deconstruct(out var blogId, out var logo);
            var blog = await blogContext.Blogs.FindAsync(new object[] { blogId }, cancellationToken);
            if (blog is null)
            {
                throw new InvalidOperationException("The blog does not exist");
            }

            await using var logoStream = logo.OpenReadStream();
            var response = await config.ImageServiceUrl
                .AppendPathSegments("api", "images")
                .PostMultipartAsync(build =>
                {
                    build.AddFile("file", logoStream, logo.FileName, logo.ContentType);
                }, cancellationToken);

            var fileResult = await response.GetJsonAsync<UploadedFileResult>();
            blog.LogoUrl = fileResult.Location;
            await blogContext.SaveChangesAsync(cancellationToken);
            return fileResult.Location;
        }

        public record UploadedFileResult(string Location);
    }
}
