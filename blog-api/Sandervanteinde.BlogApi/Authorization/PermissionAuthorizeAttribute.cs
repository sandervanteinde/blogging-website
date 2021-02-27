using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;

namespace Sandervanteinde.BlogApi.Authorization
{
    internal sealed class PermissionAuthorizeAttribute : TypeFilterAttribute
    {
        public string Permission { get; }
        public PermissionAuthorizeAttribute(string permission)
            : base(typeof(Filter))
        {
            Permission = permission;
            Arguments = new object[] { this };
        }


        private class Filter : IAuthorizationFilter
        {
            private readonly PermissionAuthorizeAttribute attribute;

            public Filter(PermissionAuthorizeAttribute attribute)
            {
                this.attribute = attribute;
            }
            public void OnAuthorization(AuthorizationFilterContext context)
            {
                if(context.HttpContext.User.Identity?.IsAuthenticated != true)
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }
                var user = context.HttpContext.User;
                if (user.Claims.Any(c => c.Type == "permissions" && c.Value == attribute.Permission))
                {
                    return;
                }
                context.Result = new ForbidResult();
            }
        }
    }
}
