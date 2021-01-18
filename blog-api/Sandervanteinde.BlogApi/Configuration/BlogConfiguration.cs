using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sandervanteinde.BlogApi.Configuration
{
    public class BlogConfiguration
    {
        public PasswordConfiguration Passwords { get; set; }
        public JwtConfiguration Jwt { get; set; }
    }

    public class PasswordConfiguration
    {
        public string Admin { get; set; }
    }

    public class JwtConfiguration
    {
        public string Issuer { get; set; }
        public string Key { get; set; }
    }
}
