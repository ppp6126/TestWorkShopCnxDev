using TestMiddleC.Models;
using TestMiddleC.Utils;

namespace TestMiddleC.Service;

public class MovieService: IMovieService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;
    private readonly AppDbContext _db;
    public MovieService(HttpClient httpClient, IConfiguration config, AppDbContext db)
    {
        _httpClient = httpClient;
        _config = config;
        _db = db;
    }

    public async Task<MovieResult?> GetUpcomingMoviesAsync()
    {
        var apiKey = _config["TMDB:ApiKey"];
        var url = $"https://api.themoviedb.org/3/movie/upcoming?api_key={apiKey}&language=en-US";
        MovieResult? result = await _httpClient.GetFromJsonAsync<MovieResult>(url);
        if (result != null)
        {
            foreach (Movies movies in result.results)
            {
                if (!_db.Movies.Any(m => m.title == movies.title && m.release_date == movies.release_date))
                    _db.Movies.Add(movies);
            }
            // Act: เพิ่มข้อมูลลงในฐานข้อมูล
            await _db.SaveChangesAsync();
        }
        return result;
    }
    public async Task<MovieResult?> GetPopularMoviesAsync()
    {
        var apiKey = _config["TMDB:ApiKey"];
        var url = $"https://api.themoviedb.org/3/movie/popular?api_key={apiKey}&language=en-US";
        MovieResult? result = await _httpClient.GetFromJsonAsync<MovieResult>(url);
        if (result != null)
        {
            foreach (Movies movies in result.results)
            {
                if (!_db.Movies.Any(m => m.title == movies.title && m.release_date == movies.release_date))
                    _db.Movies.Add(movies);
            }
            // Act: เพิ่มข้อมูลลงในฐานข้อมูล
            // await _db.SaveChangesAsync();
        }
        return result;
    }
}