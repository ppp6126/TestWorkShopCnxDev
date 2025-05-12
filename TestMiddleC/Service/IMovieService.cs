using TestMiddleC.Models;

namespace TestMiddleC.Service;

public interface IMovieService
{
    Task<MovieResult?> GetUpcomingMoviesAsync();
}