using Microsoft.EntityFrameworkCore;
using Npgsql;
using Sandervanteinde.BlogApi.Database.Configuration;
using Sandervanteinde.BlogApi.Database.Entities;

namespace Sandervanteinde.BlogApi.Database
{
    public sealed class BlogContext : DbContext
    {
        static BlogContext()
        {
            NpgsqlConnection.GlobalTypeMapper.MapEnum<Blog.BlogStatus>();
        }

        public DbSet<Blog> Blogs { get; set; } = null!;
        public DbSet<BlogUrl> BlogUrls { get; set; } = null!;
        public DbSet<BlogCategory> BlogCategories { get; set; } = null!;

        public BlogContext(DbContextOptions<BlogContext> opts)
            : base(opts)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresEnum<Blog.BlogStatus>();
            modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
        }
    }
}
