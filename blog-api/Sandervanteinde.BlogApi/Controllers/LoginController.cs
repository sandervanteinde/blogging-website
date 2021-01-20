using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Sandervanteinde.BlogApi.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Sandervanteinde.BlogApi.Controllers
{
    [Route("api/login")]
    public class LoginController : ControllerBase
    {
        private readonly IOptions<BlogConfiguration> opts;

        public LoginController(IOptions<BlogConfiguration> opts)
        {
            this.opts = opts;
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult<TokenResponse> Post(LoginRequest request)
        {
            if(request.Password != opts.Value.Passwords.Admin)
            {
                return Forbid();
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(opts.Value.Jwt.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(opts.Value.Jwt.Issuer,
              opts.Value.Jwt.Issuer,
              claims: new[] { 
                  new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                  new Claim("user-role", "Admin")
              },
              expires: DateTime.UtcNow.AddDays(30),
              signingCredentials: credentials);

            return new TokenResponse(new JwtSecurityTokenHandler().WriteToken(token));
        }
        
        public record LoginRequest(string Password) { }
        public record TokenResponse(string Token) { }
    }
}
