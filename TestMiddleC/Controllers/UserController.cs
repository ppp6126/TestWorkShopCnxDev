using Microsoft.AspNetCore.Mvc;
using TestMiddleC.Dto;
using TestMiddleC.Models;
using TestMiddleC.Service;

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
    public async Task<ObjectResult> AddUserPerson([FromBody] UserDto userReq)
    {
        User user = await _userService.addUserPerson(userReq);
        // return user == null ? StatusCode(500, "Failed to fetch data.") : Ok(user);
        return CreatedAtAction(nameof(GetUser), $"/users/{new { id = user.Id} }", user);
    }
    [HttpGet("getUser/{id}")]
    public ActionResult<User> GetUser(int id)
    {
        var user = _userService.GetUserFromDb(id);
        if (user == null)
            return NotFound();

        return Ok(user);
    }
    [HttpGet("check-username")]
    public async Task<IActionResult> CheckUsernameAvailable([FromQuery] string username)
    {
        var available = await _userService.CheckUsernameAvailable(username);
        return Ok(new { available });
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var result = await _userService.Login(loginDto);
            
        if (!result.Success)
        {
            return BadRequest(result);
        }
        return Ok(result);
    }
}