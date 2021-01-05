using System.Collections.Generic;

namespace Microsoft.AspNetCore.Razor.TagHelpers
{
    public static class TagHelperOutputExtensions
    {
        public static void AddClass(this TagHelperOutput tagHelper, params string[] classes)
        {
            var newClasses = new HashSet<string>();
            if (tagHelper.Attributes.TryGetAttribute("class", out var attribute))
                foreach (var @class in attribute.Value.ToString().Split(" "))
                    newClasses.Add(@class);

            foreach (var @class in classes)
                newClasses.Add(@class);

            tagHelper.Attributes.SetAttribute("class", string.Join(' ', newClasses));
        }
    }
}
