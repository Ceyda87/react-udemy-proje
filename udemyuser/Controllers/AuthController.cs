using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Udemyuser.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Udemyuser.Controllers;
[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly string _issur;
    private readonly string _audience;
    private readonly string _signingKey;
    private readonly IConfiguration _configuration;

    public AuthController(IConfiguration configuration)
    {
        _configuration = configuration;
        _issur = _configuration["JwtConfig:Issuer"];
        _audience = _configuration["JwtConfig:Audience"];
        _signingKey = _configuration["JwtConfig:SigningKey"];
    }



    [HttpGet]
    public AuthModel Get(string userName, string password)
    {
        if (userName == "fatih" && password == "123")
        {
            try
            {
                var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_signingKey));
                var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
                var jwtSecurityToken = new JwtSecurityToken(
                    issuer: _issur,
                    audience: _audience,
                    claims: new List<Claim>
                    {
                new Claim(ClaimTypes.Name, userName),
                new Claim(ClaimTypes.Role, "User")
                    },
                    expires: DateTime.Now.AddDays(20),
                    signingCredentials: signingCredentials

                );
                var token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
                return new AuthModel { Token = token, IsAuthenticated = true };
            }
            catch (System.Exception)
            {

                return new AuthModel { Token = null, IsAuthenticated = false };
            }

        }
        else
        {
            return new AuthModel { Token = null, IsAuthenticated = false };
        }

    }
    [HttpGet("ValidateToken")]
    public bool ValidateToken(string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("BuBenimSigningKey");
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken);
            return true;
        }
        catch (System.Exception)
        {
            return false;
        }

    }
}