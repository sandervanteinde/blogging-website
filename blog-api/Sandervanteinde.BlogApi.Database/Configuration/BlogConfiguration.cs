using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sandervanteinde.BlogApi.Database.Entities;

namespace Sandervanteinde.BlogApi.Database.Configuration
{
    internal class BlogConfiguration : IEntityTypeConfiguration<Blog>
    {
        public void Configure(EntityTypeBuilder<Blog> builder)
        {
            builder.HasKey(e => e.Id);

            builder.Property(e => e.Title)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(e => e.ShortDescription)
                .HasMaxLength(1000)
                .IsRequired();

            builder.Property(e => e.LogoUrl)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(e => e.MarkdownContent)
                .IsRequired();

            builder.Property(e => e.Status)
                .IsRequired();

            builder.HasIndex(e => e.Status);
        }
    }
}
