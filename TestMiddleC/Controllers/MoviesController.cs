using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using TestMiddleC.Models;
using TestMiddleC.Service;

namespace TestMiddleC.Controllers;
[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly IMovieService _movieService;

    public MoviesController(IMovieService movieService)
    {
        _movieService = movieService;
    }

    [HttpGet("upcoming")]
    public async Task<IActionResult> GetUpcomingMovies()
    {
        var movies = await _movieService.GetUpcomingMoviesAsync();
        return movies == null ? StatusCode(500, "Failed to fetch data.") : Ok(movies.results);
    }
}