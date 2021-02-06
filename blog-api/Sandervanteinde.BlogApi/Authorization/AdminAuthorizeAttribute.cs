using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Authorization
{
    internal sealed class AdminAuthorizeAttribute : TypeFilterAttribute
    {
        public AdminAuthorizeAttribute()
            : base(typeof(Filter))
        {

        }

        private class Filter : IAuthorizationFilter
        {
            public void OnAuthorization(AuthorizationFilterContext context)
            {
                if(context.HttpContext.User.Identity?.IsAuthenticated != true)
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }
                var user = context.HttpContext.User;
                if (user.Claims.Any(c => c.Type == "user-role" && c.Value == "Admin")) return;
                context.Result = new ForbidResult();
            }
        }
    }
}
