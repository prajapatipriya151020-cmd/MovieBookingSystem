   package com.moviebooking.moviebooking;

   import org.springframework.data.jpa.repository.JpaRepository;

   public interface MovieRepository extends JpaRepository<Movie, Integer> {
   }
