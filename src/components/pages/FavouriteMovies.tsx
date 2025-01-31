import { useQueries } from "@tanstack/react-query";
import MoviesList from "@organisms/MoviesList/MoviesList";
import { useAuth } from "store/useAuth";
import { getMovieById } from "@api/moviesApi";
import { LinearProgress } from "@mui/material";
import { useFilters } from "store/useFilters";
const FavouriteMovies = () => {
  const { user } = useAuth();
  const { language } = useFilters();
  const movieIds = user?.movies ?? [];
  const movieQueries = useQueries({
    queries: movieIds.map((id) => ({
      queryKey: ["movies", id],
      queryFn: () => getMovieById({ id, language }),
    })),
  });

  const isLoading = movieQueries.some((query) => query.isLoading);
  const movies = movieQueries.map((query) => query.data).filter(Boolean);

  return (
    <>
      {isLoading ? (
        <LinearProgress color="success" />
      ) : (
        <MoviesList movies={movies} />
      )}
    </>
  );
};

export default FavouriteMovies;
