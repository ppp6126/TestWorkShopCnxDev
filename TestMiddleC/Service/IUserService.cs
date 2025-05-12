using Microsoft.AspNetCore.Mvc;
using TestMiddleC.Dto;
using TestMiddleC.Models;

namespace TestMiddleC.Service;

public interface IUserService
{
     Task<User> addUserPerson(UserDto userReq);

     Task<User> GetUserFromDb(int id);
     Task<bool> CheckUsernameAvailable(string username);
     
     Task<LoginResponse> Login(LoginDto loginDto);
}