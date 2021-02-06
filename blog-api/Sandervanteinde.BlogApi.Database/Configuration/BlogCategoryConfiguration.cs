using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sandervanteinde.BlogApi.Database.Entities;

namespace Sandervanteinde.BlogApi.Database.Configuration
{
    internal class BlogCategoryConfiguration : IEntityTypeConfiguration<BlogCategory>
    {
        public void Configure(EntityTypeBuilder<BlogCategory> builder)
        {
            builder.HasMany(e => e.Blogs)
                .WithMany(e => e.Categories);

            builder.Property(e => e.Category)
                .HasMaxLength(30)
                .IsRequired();

            builder.HasIndex(e => e.Category)
                .IsUnique();
        }
    }
}
