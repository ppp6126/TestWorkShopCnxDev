namespace TestMiddleC.Models;

public class Person
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Username { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}