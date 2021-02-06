using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Sandervanteinde.BlogApi.Database.HostedServices;
using System.Threading;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Database
{
    public static class ServiceCollectionExtensions
    {
        public static void AddDatabaseServices(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<BlogContext>(opt => opt.UseSqlServer(connectionString));

            services.AddHostedService<MigrationHostedService>();
        }
    }
}
