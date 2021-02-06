using Microsoft.EntityFrameworkCore.Migrations;

namespace Sandervanteinde.BlogApi.Database.Migrations
{
    public partial class AddUniqueConstraint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BlogUrls_UrlFriendlyTitle",
                table: "BlogUrls");

            migrationBuilder.CreateIndex(
                name: "IX_BlogUrls_UrlFriendlyTitle",
                table: "BlogUrls",
                column: "UrlFriendlyTitle",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BlogUrls_UrlFriendlyTitle",
                table: "BlogUrls");

            migrationBuilder.CreateIndex(
                name: "IX_BlogUrls_UrlFriendlyTitle",
                table: "BlogUrls",
                column: "UrlFriendlyTitle");
        }
    }
}
