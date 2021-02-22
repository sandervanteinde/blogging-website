using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Sandervanteinde.BlogApi.Database.HostedServices;
using System;

namespace Sandervanteinde.BlogApi.Database
{
    public static class ServiceCollectionExtensions
    {
        public static void AddDatabaseServices(this IServiceCollection services, string connectionString, bool isDevelopment)
        {
            services.AddDbContext<BlogContext>(opt => {
                opt.UseNpgsql(connectionString);
                if(isDevelopment)
                {
                    opt.LogTo(Console.WriteLine);
                }
            });

            services.AddHostedService<MigrationHostedService>();
        }
    }
}
