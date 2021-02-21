using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Polly;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Database.HostedServices
{
    internal class MigrationHostedService : IHostedService
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ILogger<MigrationHostedService> logger;

        public MigrationHostedService(IServiceProvider serviceProvider, ILogger<MigrationHostedService> logger)
        {
            this.serviceProvider = serviceProvider;
            this.logger = logger;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            return Policy.Handle<SqlException>()
                .WaitAndRetryAsync(10, i => TimeSpan.FromSeconds(5), (ex, timeSpan) =>
                {
                    logger.LogWarning($"Failed to connect to database. Trying again after {timeSpan.TotalSeconds} seconds");
                })
                .ExecuteAsync(token => PerformMigration(token), cancellationToken);
        }

        private async Task PerformMigration(CancellationToken cancellationToken)
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<BlogContext>();
            await context.Database.MigrateAsync(cancellationToken);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
