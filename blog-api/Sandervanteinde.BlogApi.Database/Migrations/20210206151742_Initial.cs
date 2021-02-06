using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sandervanteinde.BlogApi.Database.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Blogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    LogoUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    ShortDescription = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    MarkdownContent = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    DatePublished = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BlogUrls",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BlogId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UrlFriendlyTitle = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogUrls", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BlogUrls_Blogs_BlogId",
                        column: x => x.BlogId,
                        principalTable: "Blogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Blogs_Status",
                table: "Blogs",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_BlogUrls_BlogId",
                table: "BlogUrls",
                column: "BlogId");

            migrationBuilder.CreateIndex(
                name: "IX_BlogUrls_UrlFriendlyTitle",
                table: "BlogUrls",
                column: "UrlFriendlyTitle");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlogUrls");

            migrationBuilder.DropTable(
                name: "Blogs");
        }
    }
}
