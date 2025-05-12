using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using TestMiddleC.Dto;
using TestMiddleC.Models;
using TestMiddleC.Utils;

namespace TestMiddleC.Service;

public class UserService : IUserService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;
    private readonly AppDbContext _db;
    public UserService(HttpClient httpClient, IConfiguration config, AppDbContext db)
    {
        _httpClient = httpClient;
        _config = config;
        _db = db;
    }
    public async Task<User> addUserPerson(UserDto userReq)
    { 
        // ตรวจสอบว่ามี username หรือ email นี้แล้วหรือไม่
        if (await _db.User.AnyAsync(u => u.Username == userReq.Username))
            throw new Exception("ชื่อผู้ใช้นี้มีผู้ใช้แล้ว");

        if (await _db.Person.AnyAsync(p => p.Email == userReq.Email))
            throw new Exception("อีเมลนี้มีผู้ใช้แล้ว");
        var person = new Person()
        {
            FirstName = userReq.FirstName,
            LastName = userReq.LastName,
            Email = userReq.Email,
            Phone = userReq.Phone,
            Username = userReq.Username,
            CreatedAt = DateTime.UtcNow,
        };
        EntityEntry<Person> personResult = _db.Person.Add(person);
        await _db.SaveChangesAsync();
        var user = new User()
        {
            Username = userReq.Username,
            Password = HashPassword(userReq.Password),
            PersonId = personResult.Entity.Id,
        };
        EntityEntry<User> userResult = _db.User.Add(user);
        // Act: เพิ่มข้อมูลลงในฐานข้อมูล
        await _db.SaveChangesAsync();
        return userResult.Entity ;
    }

    public Task<User> GetUserFromDb(int id)
    {
        var user = GetUserFromDb(id);
        return user;
    }
    public async Task<bool> CheckUsernameAvailable(string username)
    {
        return !await _db.User.AnyAsync(u => u.Username == username);
    }
    

    private string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
    }
    public async Task<LoginResponse> Login(LoginDto loginDto)
    {
        // ค้นหาผู้ใช้ด้วย username หรือ email
        var user = await _db.User
            .FirstOrDefaultAsync(u =>
                u.Username == loginDto.Username);

        if (user == null)
        {
            return new LoginResponse
            {
                Success = false,
                Message = "ไม่พบชื่อผู้ใช้หรืออีเมลนี้ในระบบ"
            };
        }

        // ตรวจสอบรหัสผ่าน
        if (!VerifyPassword(loginDto.Password, user.Password))
        {
            return new LoginResponse
            {
                Success = false,
                Message = "รหัสผ่านไม่ถูกต้อง"
            };
        }
        
        return new LoginResponse
        {
            Success = true,
            Message = "เข้าสู่ระบบสำเร็จ",
            User = new UserDto
            {
                Username = user.Username,
            }
        };
    }
    private bool VerifyPassword(string inputPassword, string storedHash)
    {
        using var sha256 = SHA256.Create();
        var hashedInput = sha256.ComputeHash(Encoding.UTF8.GetBytes(inputPassword));
        var hashedInputString = BitConverter.ToString(hashedInput).Replace("-", "").ToLower();
        return hashedInputString == storedHash;
    }
}