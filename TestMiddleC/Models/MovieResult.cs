namespace TestMiddleC.Models;
public class MovieResult
{
    public int page { get; set; }
    public List<Movies> results { get; set; } = new();
}
