using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TestMiddleC.Service;
using TestMiddleC.Utils;

namespace TestMiddleC;

[TestClass]
public class MovieServiceTests
{
    private DbContextOptions<AppDbContext> _options;
    private string _connectionString = "server=localhost;port=3306;database=TmdbDb;user=root;password=1234";

    [TestInitialize]
    public void Setup()
    {
        // เชื่อมต่อกับ MariaDB จริง
        _options = new DbContextOptionsBuilder<AppDbContext>()
            .UseMySql(_connectionString, ServerVersion.AutoDetect(_connectionString))
            .Options;
    }
    [TestMethod]
    public async Task GetUpcomingMoviesAsync_ReturnsResults()
    {
        using (var context = new AppDbContext(_options))
        {
            // เริ่มต้น Transaction สำหรับการทดสอบ
            var transaction = await context.Database.BeginTransactionAsync();

            try
            {
                var config = new ConfigurationBuilder()
                    .AddInMemoryCollection(new Dictionary<string, string> {
                        { "TMDB:ApiKey", "307c7894a4a56f0cfac887e273a285b3" }
                    }).Build();

                var httpClient = new HttpClient();
                var service = new MovieService(httpClient, config,context);

                var result = await service.GetUpcomingMoviesAsync();

                // Assert: ทดสอบว่าข้อมูลถูกเพิ่มเข้าสู่ฐานข้อมูลจริง
                var count = await context.Movies.CountAsync();
                Assert.IsTrue(count > 0);
            }
            catch
            {
                // Rollback transaction ถ้ามีข้อผิดพลาด
                await context.Database.RollbackTransactionAsync();
                throw;
            }

            // Commit transaction หลังจากการทดสอบเสร็จสิ้น
            await context.Database.CommitTransactionAsync();
        }
    }
}