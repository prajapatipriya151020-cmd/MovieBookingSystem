package com.moviebooking.moviebooking;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {

    private final MovieRepository repo;

    public MovieController(MovieRepository repo) {
    this.repo = repo;
}

    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        return repo.save(movie);
    }

    @GetMapping
    public List<Movie> getAllMovies() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Movie getMovie(@PathVariable int id) {
        return repo.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable int id, @RequestBody Movie movie) {
        movie.setId(id);
        return repo.save(movie);
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> deleteMovie(@PathVariable int id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return Map.of("message", "Movie deleted successfully", "id", id);
        }
        return Map.of("message", "Movie not found");
    }
}
