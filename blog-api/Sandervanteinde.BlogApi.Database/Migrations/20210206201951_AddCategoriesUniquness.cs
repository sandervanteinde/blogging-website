using Microsoft.EntityFrameworkCore.Migrations;

namespace Sandervanteinde.BlogApi.Database.Migrations
{
    public partial class AddCategoriesUniquness : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_BlogCategories_Category",
                table: "BlogCategories",
                column: "Category",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BlogCategories_Category",
                table: "BlogCategories");
        }
    }
}
