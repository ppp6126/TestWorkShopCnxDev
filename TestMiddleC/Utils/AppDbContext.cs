using Microsoft.EntityFrameworkCore;
using TestMiddleC.Models;

namespace TestMiddleC.Utils;

public class AppDbContext: DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Movies> Movies => Set<Movies>();
    public DbSet<User> User => Set<User>();
    public DbSet<Person> Person => Set<Person>();
}