namespace Sandervanteinde.BlogApi.Configuration
{
    public class BlogConfiguration
    {
        public PasswordConfiguration Passwords { get; set; } = null!;
        public JwtConfiguration Jwt { get; set; } = null!;
    }

    public class PasswordConfiguration
    {
        public string Admin { get; set; } = null!;
    }

    public class JwtConfiguration
    {
        public string Issuer { get; set; } = null!;
        public string Key { get; set; } = null!;
    }
}
