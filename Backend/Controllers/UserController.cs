using Microsoft.AspNetCore.Mvc;
using OLXClone.Services;
using OLXClone.Models;
using Microsoft.AspNetCore.Identity.Data;


namespace OLXClone.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            var existingUser = _userService.GetUserByEmail(user.Email);

            if (existingUser != null)
            {
                return BadRequest(new { message = "Email is already in use." });
            }

            try
            {
                _userService.Register(user);
                return Ok(new { message = "User registered successfully." }); 
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error. Please try again later." }); 
            }
        }





        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            var token = _userService.Authenticate(loginRequest.Email, loginRequest.Password);
            if (token == null)
            {
              
                Console.WriteLine($"Authentication failed for user: {loginRequest.Email}");
                return Unauthorized("Invalid credentials.");
            }

            return Ok(new { Token = token });
        }
    }
}
