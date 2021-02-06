using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Sandervanteinde.BlogApi.Messages
{
    public static class ServiceCollectionExtensions
    {
        public static void AddMessaging(this IServiceCollection services)
        {
            services.AddMediatR(typeof(ServiceCollectionExtensions));
        }
    }
}
