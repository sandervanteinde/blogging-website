using Microsoft.AspNetCore.Razor.TagHelpers;

namespace BlogWebsite.TagHelpers
{
    // You may need to install the Microsoft.AspNetCore.Razor.Runtime package into your project
    [HtmlTargetElement("container")]
    public class ContainerTagHelper : TagHelper
    {
        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "div";
            output.AddClass("container__content");
            output.PreElement.AppendHtml("<div class=\"container\">");
            output.PostElement.AppendHtml("</div>");
        }
    }
}
