using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Sandervanteinde.BlogApi.Database.Entities;

namespace Sandervanteinde.BlogApi.Database.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:blog_status", "draft,published");

            migrationBuilder.CreateTable(
                name: "BlogCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Category = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Blogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    LogoUrl = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    ShortDescription = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    MarkdownContent = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<Blog.BlogStatus>(type: "blog_status", nullable: false),
                    DatePublished = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BlogBlogCategory",
                columns: table => new
                {
                    BlogsId = table.Column<Guid>(type: "uuid", nullable: false),
                    CategoriesId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogBlogCategory", x => new { x.BlogsId, x.CategoriesId });
                    table.ForeignKey(
                        name: "FK_BlogBlogCategory_BlogCategories_CategoriesId",
                        column: x => x.CategoriesId,
                        principalTable: "BlogCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BlogBlogCategory_Blogs_BlogsId",
                        column: x => x.BlogsId,
                        principalTable: "Blogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BlogUrls",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    BlogId = table.Column<Guid>(type: "uuid", nullable: false),
                    UrlFriendlyTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false)
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
                name: "IX_BlogBlogCategory_CategoriesId",
                table: "BlogBlogCategory",
                column: "CategoriesId");

            migrationBuilder.CreateIndex(
                name: "IX_BlogCategories_Category",
                table: "BlogCategories",
                column: "Category",
                unique: true);

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
                column: "UrlFriendlyTitle",
                unique: true);

            migrationBuilder.InsertData(@"BlogCategories", new[] { "Id", "Category" }, new object[,] {
                { Guid.NewGuid(), "ASP.NET Core" },
                { Guid.NewGuid(), "C#" },
                { Guid.NewGuid(), "Angular" },
                { Guid.NewGuid(), "TypeScript" }
            });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlogBlogCategory");

            migrationBuilder.DropTable(
                name: "BlogUrls");

            migrationBuilder.DropTable(
                name: "BlogCategories");

            migrationBuilder.DropTable(
                name: "Blogs");
        }
    }
}
