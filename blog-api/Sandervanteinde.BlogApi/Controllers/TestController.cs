using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sandervanteinde.BlogApi.Authorization;

namespace Sandervanteinde.BlogApi.Controllers
{
    [Route("api/test")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        [AdminAuthorize]
        public ActionResult<string> Get()
        {
            return "Hello Admin";
        }
    }
}
