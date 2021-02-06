using MediatR;
using Sandervanteinde.BlogApi.Messages.Queries;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Infrastructure.Queries
{
    public class UrlFriendlyStringQueryHandler : IRequestHandler<UrlFriendlyStringQuery, string>
    {
        private static readonly Regex NonAlphaNumericRegex = new Regex(@"[^a-z0-9-]+", RegexOptions.Compiled);
        public Task<string> Handle(UrlFriendlyStringQuery request, CancellationToken cancellationToken)
        {
            var toLowerAndSpacesReplaced = request.Url.ToLower().Replace(' ', '-');

            var removeAllNonAlpha = NonAlphaNumericRegex.Replace(toLowerAndSpacesReplaced, string.Empty);

            return Task.FromResult(removeAllNonAlpha);
        }
    }
}
