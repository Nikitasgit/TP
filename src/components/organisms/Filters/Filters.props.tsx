import { IMovie } from "types/movieType";

export interface IFiltersProps {
  setFilteredMovies: (movies: IMovie[]) => void;
  setIsLoading: (value: boolean) => void;
}
