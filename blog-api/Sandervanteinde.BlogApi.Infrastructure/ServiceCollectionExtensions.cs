using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Sandervanteinde.BlogApi.Infrastructure.Configuration;
using System;

namespace Sandervanteinde.BlogApi.Infrastructure
{
    public static class ServiceCollectionExtensions
    {
        public static void AddInfrastructure(this IServiceCollection services, string imageServiceUri)
        {
            services.AddMediatR(typeof(ServiceCollectionExtensions));
            services.AddSingleton(new ImageServiceConfiguration(new Uri(imageServiceUri)));
        }
    }
}