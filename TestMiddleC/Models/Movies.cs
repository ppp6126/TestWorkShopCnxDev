namespace TestMiddleC.Models;

public class Movies
{
    public int Id { get; set; } // <== สำหรับ DB
    public string title { get; set; } = string.Empty;
    public string overview { get; set; } = string.Empty;
    public string release_date { get; set; } = string.Empty;
}