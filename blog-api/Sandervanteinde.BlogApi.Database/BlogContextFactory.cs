using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Sandervanteinde.BlogApi.Database
{
    internal class BlogContextFactory : IDesignTimeDbContextFactory<BlogContext>
    {
        public BlogContext CreateDbContext(string[] args)
        {
            var opts = new DbContextOptionsBuilder<BlogContext>();
            opts.UseSqlServer();
            return new BlogContext(opts.Options);
        }
    }
}
