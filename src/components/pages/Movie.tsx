import { useMovieById } from "@hooks/queries";
import { useParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { useFilters } from "store/useFilters";
import MovieDisplay from "@organisms/MovieDisplay/MovieDisplay";

const Movie = () => {
  const { id } = useParams();
  const { language } = useFilters();
  const { data, isLoading } = useMovieById({
    id: Number(id),
    language,
  });

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <MovieDisplay
          title={data.title}
          overview={data.overview}
          poster_path={data.poster_path}
          release_date={data.release_date}
          vote_average={data.vote_average}
          genres={data.genres}
          homepage={data.homepage}
          production_companies={data.production_companies}
        />
      )}
    </>
  );
};

export default Movie;
