import AlertMessage from "@molecules/AlertMessage/AlertMessage";
import { LinearProgress } from "@mui/material";
import Filters from "@organisms/Filters/Filters";
import MoviesList from "@organisms/MoviesList/MoviesList";
import { useState } from "react";
import { IMovie } from "types/movieType";

const Home = () => {
  const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <main>
      <Filters
        setFilteredMovies={setFilteredMovies}
        setIsLoading={setIsLoading}
      />
      {isLoading ? (
        <LinearProgress color="success" />
      ) : (
        <MoviesList movies={filteredMovies} />
      )}
      {!filteredMovies.length && !isLoading && (
        <AlertMessage
          isErrorMessage={true}
          message="Aucun film ne correspond à votre recherche"
        />
      )}
    </main>
  );
};

export default Home;
