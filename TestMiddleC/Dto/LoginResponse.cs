namespace TestMiddleC.Dto;

public class LoginResponse
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public UserDto User { get; set; }
}