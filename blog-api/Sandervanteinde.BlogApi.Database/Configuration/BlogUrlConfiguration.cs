using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sandervanteinde.BlogApi.Database.Entities;

namespace Sandervanteinde.BlogApi.Database.Configuration
{
    internal class BlogUrlConfiguration : IEntityTypeConfiguration<BlogUrl>
    {
        public void Configure(EntityTypeBuilder<BlogUrl> builder)
        {
            builder.HasKey(e => e.Id);

            builder.HasOne(e => e.Blog)
                .WithMany(e => e.BlogUrls)
                .HasForeignKey(e => e.BlogId);

            builder.Property(e => e.UrlFriendlyTitle)
                .HasMaxLength(200)
                .IsRequired();

            builder.HasIndex(e => e.UrlFriendlyTitle)
                .IsUnique();
        }
    }
}
