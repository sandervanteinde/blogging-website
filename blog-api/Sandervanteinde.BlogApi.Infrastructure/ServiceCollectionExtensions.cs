using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Sandervanteinde.BlogApi.Infrastructure
{
    public static class ServiceCollectionExtensions
    {
        public static void AddInfrastructure(this IServiceCollection services)
        {
            services.AddMediatR(typeof(ServiceCollectionExtensions));
        }
    }
}